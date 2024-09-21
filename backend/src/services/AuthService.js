const { message } = require('antd');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { error } = require('console');
const axios = require('axios');
const supportFunction = require('./support');

class AuthService {
    createUser = async (data) => {
        const { email, password, name, role, uid } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
                if (existingUsers.length > 0) { 
                    resolve({ status: false, message: "Email đã được dùng" });
                    return;
                }
                if (typeof email === 'object' && email !== null) email = String(email.address);
                if (typeof email !== 'string' || !email.endsWith('@hcmut.edu.vn')) {
                    resolve({ status: false, message: "Email không đúng định dạng" });
                    return;
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                var page = "";
                const start = supportFunction.startTime();
                const [result] = await db.query(
                    'INSERT INTO users (email, password, name, uid, page, start, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
                    [email, hashedPassword, name, uid, page, start, role, true]
                );
                if (result.affectedRows === 1) {
                    resolve({
                        status: true,
                        name: name,
                        email: email,
                        role: role,
                        user_status: true
                    });
                } 
                else resolve({ status: false, message: "Không thể tạo tài khoản" });
            }
            catch (error) {
                reject(error);
            }
        });
    }

    logout = (req) => {
        return new Promise((resolve, reject) => {
            if (req.session.user) {
                req.session.destroy((err) => {
                    if (err) reject({ status: false, message: 'Đăng xuất thất bại' });
                    else resolve({ status: true, message: 'Đăng xuất thành công' });
                });
            } 
            else resolve({ status: false, message: 'Chưa đăng nhập' });
        });
    }    

    login = async (data, req) => {
        const { email, password } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
                if (rows.length === 0) {
                    resolve({ status: false, message: "Tài khoản không tồn tại" });
                    return;
                }
                const user = rows[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    resolve({ status: false, message: "Mật khẩu sai" });
                    return;
                }
                if (user.status == 1) {
                    req.session.user = {
                        id: user.uid,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                    console.log(req.session.user.id);
                    resolve({
                        status: true,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        user_status: user.status
                    });
                } 
                else resolve({ status: false, message: "Tài khoản đã bị ban" });
            } 
            catch (error) {
                reject(error);
            }
        });
    }

    forgotPassword = async (body) => {
        const { email } = body
        return new Promise (async (resolve, reject) => {
            try {
                const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
                if (existingUsers.length === 0) resolve({ status: false, message: "Tài khoản không tồn tại" });
                const newPassword = Math.random().toString(36).slice(-8);
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const updatePasswordQuery = `UPDATE users SET password = ? WHERE email = ?`;
                const [result] = await db.query(updatePasswordQuery, [hashedPassword, email]);
                if (result.affectedRows === 1) {
                    const data = {
                        email,
                        mess: `Đây là mật khẩu mới của bạn ${newPassword}`
                    };
                    axios.post('https://ttdev.id.vn/send.php', data)
                    .then(response => {
                        if (response.data.status === 'success') {
                            resolve({
                                email: email,
                                password: newPassword
                            });
                        } 
                        else {
                            reject({ status: false, message: "Lỗi khi gửi mail" });
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
                else resolve({ status: false, message: "Cập nhật mật khẩu thất bại" });
            } 
            catch (error) {
                reject(error);
            }
        });
    }

    changePassword = async (data) => {
        const { currentPassword, newPassword, email } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
                if (rows.length === 0) {
                    resolve({ status: false, message: "Tài khoản không tồn tại" });
                    return;
                }
                const user = rows[0];
                const isMatch = await bcrypt.compare(currentPassword, user.password);
                if (!isMatch) {
                    resolve({ status: false, message: "Mật khẩu sai" });
                    return;
                }
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                const updatePasswordQuery = `UPDATE users SET password = ? WHERE email = ?`;
                const [result] = await db.query(updatePasswordQuery, [hashedPassword, email]);
                if (result.affectedRows === 1) {
                    resolve({
                        email: email,
                        password: newPassword
                    });
                } else resolve({ status: false, message: "Cập nhật mật khẩu thất bại" });
            }
            catch (error) {
                reject(error);
            }
        });
    };
}

module.exports = new AuthService