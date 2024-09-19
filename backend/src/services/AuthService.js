const { message } = require('antd');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { error } = require('console');
const axios = require('axios');

class AuthService {
    createUser = async (data) => {
        const { email, password, name, role } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
                if (existingUsers.length > 0) { 
                    resolve({ status: false, message: "Email already in use" });
                    return;
                }
                if (typeof email === 'object' && email !== null) email = String(email.address);
                if (typeof email !== 'string' || !email.endsWith('@hcmut.edu.vn')) {
                    resolve({ status: false, message: "Incorrect format email" });
                    return;
                }
                const hashedPassword = await bcrypt.hash(password, 10);
                var phonenum = "";
                var address = "";
                var sex = "";
                var date_of_birth = "";
                const [result] = await db.query(
                    'INSERT INTO users (email, password, name, phonenum, address, sex, date_of_birth, role, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [email, hashedPassword, name, phonenum, address, sex, date_of_birth, role, true]
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
                else resolve({ status: false, message: "Failed to create user" });
                resolve({status: true})
            } 
            catch (error) {
                reject(error);
            }
        });
    }

    logout = (req) => {
        return new Promise((resolve, reject) => {
            if (req.session) {
                req.session.destroy((err) => {
                    if (err) reject({ status: false, message: 'Error logging out' });
                    else resolve({ status: true });
                });
            } 
            else resolve({ status: false, message: 'No active session' });
        });
    }    

    login = async (data, req) => {
        const { email, password } = data;
        return new Promise(async (resolve, reject) => {
            try {
                const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
                if (rows.length === 0) {
                    resolve({ status: false, message: "Invalid account" });
                    return;
                }
                const user = rows[0];
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    resolve({ status: false, message: "Wrong password" });
                    return;
                }
                if (user.status == 1) {
                    req.session.user = {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                    resolve({
                        status: true,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        user_status: user.status
                    });
                } 
                else resolve({ status: false, message: "User has been banned" });
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
                if (existingUsers.length === 0) resolve({ status: false, message: "Invalid account" });
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
                            reject({ status: false, message: "Send mail error" });
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
                }
                else resolve({ status: false, message: "Password update failed" });
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
                    resolve({ status: false, message: "Invalid account" });
                    return;
                }
                const user = rows[0];
                const isMatch = await bcrypt.compare(currentPassword, user.password);
                if (!isMatch) {
                    resolve({ status: false, message: "Wrong password" });
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
                } else resolve({ status: false, message: "Password update failed" });
            }
            catch (error) {
                reject(error);
            }
        });
    };
}

module.exports = new AuthService