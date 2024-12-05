const SPSOService = require('../services/SPSOService');
const support = require('../services/support');

class SPSOController {
    getAllPrinter = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng!' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const result = await SPSOService.fetchAllPrinter();
            res.json(result);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }

    UpdatePrinterStatus = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const { ma_may_in, trang_thai } = req.body;
            await SPSOService.updatePrinterStatus(ma_may_in, trang_thai);
            res.json({ message: 'Cập nhật trạng thái thành công!' });
        }
        catch (err) {
            res.status(400).json(err);
        }
    }

    AddPrinter = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng!' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const data = req.body;
            const result = await SPSOService.addPrinter(data);
            res.json({ ma_may_in: result, message: 'Thêm máy in thành công!' });
        }
        catch (err) {
            res.status(400).json(err);
        }
    }

    getAllPrintOrder = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng!' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const result = await SPSOService.fetchAllPrintOrder();
            res.json(result);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }

    UpdatePrintOrderStatus = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng!' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const { ma_don_in, trang_thai } = req.body;
            if (trang_thai != 'Đã in' && trang_thai != 'Đang in' && trang_thai != 'Chờ in') {
                return res.json({ message: 'Trạng thái không hợp lệ!' });
            }
            await SPSOService.updatePrintOrderStatus(req.session.user.id, ma_don_in, trang_thai);
            res.json({ message: 'Cập nhật trạng thái thành công!' });
        }
        catch (err) {
            res.status(400).json(err);
        }
    }

    updateStatus = async (req, res) => {
        try {
            const result = await SPSOService.updateStatus(req.body, req);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(200).json(err);
        }
    }

    student_manager = async (req, res) => {
        try {
            const result = await SPSOService.student_manager(req);
            return res.status(200).send(result);
        } catch (err) {
            return res.status(200).json(err);
        }
    }

    report = async (req, res) => {
        try {
            const createReportList = await SPSOService.createReportList(req);
            const report_list = await SPSOService.reportList(req);
            const result = await Promise.all(report_list.reverse().map(async (temp) => {
                const detail = await SPSOService.reportDetail(req, temp.createdTime.split(' ')[0].split('-')[1]);
                const using = await SPSOService.reportUsing(req, temp.createdTime.split(' ')[0].split('-')[1]);
                const report_detail = {
                    printers: detail,
                    chartData: using
                }
                return { ...temp, ...report_detail };
            }))
            return res.status(200).send(result);
        } catch (err) {
            return res.status(200).json(err);
        }
    }

    adminHomPage = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const result = await SPSOService.adminHomePage();
            return res.status(200).send(result);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    getSystemInfo = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng!' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const result = await SPSOService.fetchSystemInfo();
            res.json(result);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    addNewSemester = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng!' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const data = req.body;
            const SPSOId = req.session.user.id;
            await SPSOService.addNewSemester(data, SPSOId);
            res.json({ message: 'Thêm học kỳ mới thành công!' });
        }
        catch (err) {
            if (err.message === 'Mã học kì đã tồn tại') {
                return res.status(400).json({ message: err.message });
            }
            res.status(400).json(err);
        }
    }
    updateSystem = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng!' });
            }
            if (req.session.user.role != 'SPSO') {
                return res.status(403).json({ message: 'Không có quyền truy cập!' });
            }
            const data = req.body;
            const SPSOId = req.session.user.id;
            await SPSOService.updateSystem(data, SPSOId);
            res.json({ message: 'Cập nhật hệ thống thành công!' });
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
}
module.exports = new SPSOController;