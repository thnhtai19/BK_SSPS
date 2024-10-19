import { useState } from "react";
import axios from "axios";
import { Select, Breadcrumb, DatePicker } from "antd";
import { Link } from "react-router-dom";
import { Button, ConfigProvider } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormInput from "../../components/FormInputComponent/FormInput";

const { Option } = Select;

const AdminSystemSettingPage = () => {
    const [term, setTerm] = useState("");
    const [newTerm, setNewTerm] = useState("");
    const [pageCount, setPageCount] = useState(30);
    const [resetDate, setResetDate] = useState("18-10-2024");
    const [systemState, setSystemState] = useState("Đang hoạt động");
    const [fileType, setFileType] = useState(".doc");
    const [price, setPrice] = useState(100);

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
        if (!fileType) {
            errors.push("Định dạng tệp không được để trống.");
        }

        if (errors.length > 0) {
            notifyError(errors.join(" "));
            return;
        }

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
        if (!fileType) {
            errors.push("Định dạng tệp không được để trống.");
        }

        if (errors.length > 0) {
            notifyError(errors.join(" "));
            return;
        }

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
    const handleResetDateChange = (date, dateString) => {
        setResetDate(dateString);
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
                    <legend className="font-bold text-xl">
                        Cấu hình hệ thống
                    </legend>
                    <fieldset className="grid grid-cols-1 sm:grid-cols-4 gap-4 col-span-4">
                        <FormInput
                            ID={"page-number"}
                            Type={"number"}
                            initialValue={pageCount}
                            Text={"Số trang mặc định"}
                            onChange={setPageCount}
                        />
                        <div className="flex flex-col">
                            <label
                                htmlFor="reset-date"
                                className="text-gray-700 mb-1 font-medium"
                            >
                                Ngày reset số trang
                            </label>
                            <DatePicker
                                id="reset-date"
                                onChange={handleResetDateChange}
                                format="DD-MM-YYYY"
                                className="w-full h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        </div>
                        <FormInput
                            ID={"format"}
                            Type={"text"}
                            initialValue={fileType}
                            Text={"Chấp nhận định dạng"}
                            onChange={setFileType}
                        />
                        <FormInput
                            ID={"price"}
                            Type={"number"}
                            initialValue={price}
                            Text={"Giá mỗi trang in mua thêm (VNĐ)"}
                            onChange={setPrice}
                        />
                        <div className="flex flex-col">
                            <label
                                htmlFor="referrer"
                                className="text-gray-700 mb-1 font-medium"
                            >
                                Bảo trì hệ thống
                            </label>
                            <ConfigProvider
                                theme={{
                                    token: {
                                        colorBgContainer: "#f3f4f6",
                                        colorText: "#444444",
                                    },
                                }}
                            >
                                <Select
                                    id="referrer"
                                    defaultValue={systemState}
                                    onChange={setSystemState}
                                    placeholder="(chọn trạng thái)"
                                    dropdownStyle={{
                                        maxHeight: 200,
                                        overflow: "auto",
                                    }}
                                    className="w-full h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <Option value="Đang hoạt động">
                                        Đang hoạt động
                                    </Option>
                                    <Option value="Đã tạm ngưng">
                                        Đã tạm ngưng
                                    </Option>
                                </Select>
                            </ConfigProvider>
                        </div>
                    </fieldset>
                    <div className="col-span-4 flex justify-end">
                        <Button
                            type="button"
                            onClick={handleUpdateSystem}
                            className="w-32 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Cập nhật
                        </Button>
                    </div>
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
                    </fieldset>
                </form>
                <div className="col-span-4 flex justify-end">
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
