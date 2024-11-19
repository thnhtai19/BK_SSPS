import { useState, useEffect } from "react";
import { DatePicker } from "antd";
import axios from "axios";
import { Select, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../../components/FormInputComponent/FormInput";
import dayjs from "dayjs";
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AdminSystemSettingPage = () => {
    const [term, setTerm] = useState("");
    const [newTerm, setNewTerm] = useState("");
    const [pageCount, setPageCount] = useState("");
    const [resetDate, setResetDate] = useState("");
    const [systemState, setSystemState] = useState("");
    const navigate = useNavigate();
    const [price, setPrice] = useState("");
    const [fileStatus, setFileStatus] = useState("");
    const parseFileStatus = (acceptedFileTypes) => {
        const updatedFileStatus = {
            pdf: "Đang tắt",
            pptx: "Đang tắt",
            docx: "Đang tắt",
            doc: "Đang tắt",
        };
    
        if (acceptedFileTypes) {
            const types = acceptedFileTypes.split(", ");
            types.forEach(type => {
                if (updatedFileStatus.hasOwnProperty(type)) {
                    updatedFileStatus[type] = "Đang bật";
                }
            });
        }
        
        return updatedFileStatus;
    };
    
    useEffect(() => {
        const fetchSystemInfo = async () => {
            try {
                const response = await axios.get("http://localhost:3001/spso/systemInfo", {
                    withCredentials: true,
                });

                if (response.status === 401) {
                    navigate("/auth/login");
                    return;
                }
                if (response.data && response.data.length > 0) {
                    const systemInfo = response.data[0];
    
                    setPageCount(systemInfo.so_giay_mac_dinh || "");
                    setTerm(systemInfo.ma_hoc_ki || "");
                    setPrice(systemInfo.gia);
                    setResetDate(systemInfo.ngay_reset || "");
                    setSystemState(systemInfo.trang_thai_bao_tri || "");
                    setFileStatus(parseFileStatus(systemInfo.loai_tep_chap_nhan || ""));
    
                    console.log({
                        pageCount: systemInfo.so_giay_mac_dinh,
                        term: systemInfo.ma_hoc_ki,
                        price: systemInfo.gia,
                        resetDate: systemInfo.ngay_reset,
                        systemState: systemInfo.trang_thai_bao_tri,
                        fileStatus: parseFileStatus(systemInfo.loai_tep_chap_nhan),
                    });
                }
            } catch (err) {
                console.error("Lỗi khi lấy dữ liệu cấu hình hệ thống:", err);
                notifyError("Không thể lấy dữ liệu cấu hình hệ thống.");
                if (err.response && err.response.status === 401) {
                    navigate("/auth/login");
                }
            }
        };
        fetchSystemInfo();
    }, [navigate]);
   
    const notifySuccess = (message) => {
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const notifyError = (message) => {
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const getFileTypes = () => {
        let enabledFileTypes = ""; 
        if (fileStatus.pdf === "Đang bật") enabledFileTypes += "pdf, ";
        if (fileStatus.pptx === "Đang bật") enabledFileTypes += "pptx, ";
        if (fileStatus.docx === "Đang bật") enabledFileTypes += "docx, ";
        if (fileStatus.doc === "Đang bật") enabledFileTypes += "doc, ";
    
        if (enabledFileTypes.endsWith(", ")) {
            enabledFileTypes = enabledFileTypes.slice(0, -2);
        }
    
        return enabledFileTypes;
    };
    
    const handleAddSemester = async () => {
        const errors = [];

        if (!newTerm) {
            errors.push("Tên học kỳ không được để trống.");
        }
        if (!pageCount || pageCount <= 0) {
            errors.push("Số trang mặc định phải lớn hơn 0.");
        }
        if (!price || price < 0) {
            errors.push("Giá phải là một số dương.");
        }
        if (!resetDate) {
            errors.push("Ngày reset không được để trống.");
        }
        if (!systemState) {
            errors.push("Trạng thái hệ thống không được để trống.");
        }
        if (errors.length > 0) {
            notifyError(errors.join(" "));
            return;
        }
        const fileType = getFileTypes();

        try {
            const response = await axios.post(
                "http://localhost:3001/spso/addNewSemester",
                {
                    ma_hoc_ki: newTerm,
                    so_giay_mac_dinh: pageCount,
                    gia: price,
                    ngay_reset: resetDate,
                    trang_thai_bao_tri: systemState,
                    loai_tep_chap_nhan: fileType,
                },
                { withCredentials: true },
            );

            if (response.data.message) {
                notifySuccess(response.data.message);
            }
        } catch (err) {
            if (err.response) {
                notifyError(err.response.data.message || "Có lỗi xảy ra!");
            } else {
                notifyError("Lỗi kết nối đến server.");
            }
        }
    };

    const handleUpdateSystem = async () => {
        const errors = [];

        if (!term) {
            errors.push("Học kỳ hiện tại không được để trống.");
        }
        if (!pageCount || pageCount <= 0) {
            errors.push("Số trang mặc định phải lớn hơn 0.");
        }
        if (!price || price < 0) {
            errors.push("Giá phải là một số dương.");
        }
        if (!resetDate) {
            errors.push("Ngày reset không được để trống.");
        }
        if (!systemState) {
            errors.push("Trạng thái hệ thống không được để trống.");
        }

        if (errors.length > 0) {
            notifyError(errors.join(" "));
            return;
        }
        const fileType = getFileTypes();

        try {
            const response = await axios.post(
                "http://localhost:3001/spso/updateSystem",
                {
                    ma_hoc_ki: term,
                    so_giay_mac_dinh: pageCount,
                    gia: price,
                    ngay_reset: resetDate,
                    trang_thai_bao_tri: systemState,
                    loai_tep_chap_nhan: fileType,
                },
                { withCredentials: true },
            );

            if (response.data.message) {
                notifySuccess(response.data.message);
            }
        } catch (err) {
            if (err.response) {
                console.error("Chi tiết lỗi:", err.response.data);
                notifyError(
                    err.response.data.message ||
                        "Có lỗi xảy ra khi cập nhật hệ thống.",
                );
            } else {
                console.error("Lỗi không xác định:", err);
                notifyError("Lỗi kết nối đến server.");
            }
        }
    };

    return (
        <>
            <div className="text-sm mb-5 p-4">
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        <Link to="/">bkssps.vn</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        <Link to="/admin/home">Admin</Link>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>Cấu hình hệ thống</Breadcrumb.Item>
                </Breadcrumb>
            </div>
            <div className="w-11/12 h-auto mx-auto mt-12 py-3 px-5 border border-solid rounded-2xl bg-white">
            <form className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
    <legend className="font-bold text-xl col-span-4">
        Cấu hình hệ thống
    </legend>
    <fieldset className="grid grid-cols-1 sm:grid-cols-4 gap-4 col-span-4">
    <div className="col-span-4 sm:col-span-1">
            <FormInput
                ID={"page-number"}
                Type={"number"}
                initialValue={pageCount}
                Text={"Số trang mặc định"}
                onChange={setPageCount}
                className="w-full"
            />
        </div>

        <div className="col-span-4 sm:col-span-1">
            <FormInput
                ID={"price"}
                Type={"number"}
                initialValue={price}
                Text={"Giá mỗi trang in mua thêm"}
                onChange={setPrice}
                className="w-full"
            />
        </div>

        <div className="col-span-4 sm:col-span-1">
            <label htmlFor="system-state" className="text-gray-700 mb-1 font-medium">
                Bảo trì hệ thống
            </label>
            <ConfigProvider theme={{
                token: {
                    colorBgContainer: "#f3f4f6",
                    colorText: "#444444",
                },
            }}>
                <Select
                    id="system-state"
                    value={systemState}
                    onChange={setSystemState}
                    placeholder="(chọn trạng thái)"
                    className="w-full h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    <Option value="Đang hoạt động">Đang hoạt động</Option>
                    <Option value="Đã tạm ngưng">Đã tạm ngưng</Option>
                </Select>
            </ConfigProvider>
        </div>

        <div className="flex flex-col col-span-4">
        <legend className="font-bold text-xl mb-4">
        Trạng thái tệp
    </legend>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                {Object.entries(fileStatus).map(([fileType, status]) => (
                    <div className="flex flex-col col-span-1" key={fileType}>
                        <label className="text-gray-700 mb-1 font-medium">{`Tệp ${fileType.toUpperCase()}`}</label>
                        <ConfigProvider
                            theme={{
                                token: {
                                    colorBgContainer: "#f3f4f6",
                                    colorText: "#444444",
                                },
                            }}
                        >
                            <Select
                                value={status}
                                onChange={(value) => setFileStatus((prev) => ({ ...prev, [fileType]: value }))}
                                className="w-full h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                <Option value="Đang bật">Đang bật</Option>
                                <Option value="Đang tắt">Đang tắt</Option>
                            </Select>
                        </ConfigProvider>
                    </div>
                ))}
            </div>
        </div>
    </fieldset>
</form>



                <form className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
                    <legend className="font-bold text-xl mb-2">
                        Quản lí học kỳ
                    </legend>
                    <fieldset className="grid grid-cols-1 sm:grid-cols-4 gap-4 col-span-4">
                        <FormInput
                            ID={"term"}
                            Type={"text"}
                            initialValue={term}
                            Text={"Học kỳ hiện tại"}
                            onChange={setTerm}
                        />
                        <FormInput
                            ID={"newTerm"}
                            Type={"text"}
                            initialValue={newTerm}
                            Text={"Thêm học kỳ mới"}
                            Placeholder="Nhập tên học kỳ"
                            onChange={setNewTerm}
                        />
                        <div className="flex flex-col">
    <label className="text-gray-700 mb-1 font-medium">Ngày reset số trang</label>
    <DatePicker
    format="DD-MM-YYYY"
    value={resetDate ? dayjs(resetDate, "DD-MM-YYYY") : null} // Chuyển đổi giá trị sang dayjs nếu cần
    onChange={(date, dateString) => setResetDate(dateString)} // Cập nhật state khi chọn ngày
    className="w-full h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
</div>
                    </fieldset>
                </form>
                 <div className="flex flex-row justify-end col-span-4 space-x-4">
            
                        <Button
                            type="button"
                            onClick={handleUpdateSystem}
                            className="w-32 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Cập nhật
                        </Button>
                    
                    <Button
                        type="button"
                        onClick={handleAddSemester}
                        className="w-32 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        Thêm
                    </Button>
            
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AdminSystemSettingPage;
