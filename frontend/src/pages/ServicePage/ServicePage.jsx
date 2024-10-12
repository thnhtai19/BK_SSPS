import React, { useState, useEffect, useCallback } from "react";
import { Breadcrumb, Modal, Slider } from "antd";
import { Link } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ServicePage = () => {
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [pageOffsets, setPageOffsets] = useState([]);

  const [printer, setPrinter] = useState("");
  const [size, setSize] = useState("A4");
  const [faces, setFaces] = useState("2 mặt");
  const [copies, setCopies] = useState("1");
  const [pageSelection, setPageSelection] = useState("Tất cả");
  const [customPages, setCustomPages] = useState("");
  const [isCustomDisabled, setIsCustomDisabled] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const [acceptedDocuments, setAcceptedDocuments] = useState([]);
  const [activePrinters, setActivePrinters] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [studentPaper, setStudentPaper] = useState(0);

  const fetchAcceptedDocumentsAndPrinters = useCallback(async () => {
    try {
      const response = await fetch(
        `${apiUrl}user/AcceptedDocumentAndPrinterInfo`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      const data = await response.json();

      if (data.message === "Chưa xác thực thông tin người dùng") {
        setErrorMessage("Chưa xác thực thông tin người dùng");
      } else {
        setAcceptedDocuments(data.acceptedDocuments.map((doc) => doc.loai_tep));
        setActivePrinters(data.activePrinters);
        setStudentPaper(data.so_giay_con);
      }
    } catch (error) {
      setErrorMessage("Không thể kết nối đến máy chủ.");
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchAcceptedDocumentsAndPrinters();
  }, [fetchAcceptedDocumentsAndPrinters]);

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const droppedFile = event.dataTransfer.files[0];
      const fileName = droppedFile.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      if (acceptedDocuments.includes(fileExtension)) {
        setFile(droppedFile);
        setFileUrl(URL.createObjectURL(droppedFile));
      } else {
        alert(`Chỉ chấp nhận các định dạng: ${acceptedDocuments.join(", ")}`);
      }
    }
  };

  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files[0]) {
      const uploadedFile = event.target.files[0];
      const fileName = uploadedFile.name;
      const fileExtension = fileName.split(".").pop().toLowerCase();

      if (acceptedDocuments.includes(fileExtension)) {
        setFile(uploadedFile);
        setFileUrl(URL.createObjectURL(uploadedFile));
      } else {
        alert(`Chỉ chấp nhận các định dạng: ${acceptedDocuments.join(", ")}`);
      }
    }
  };

  const handlePageSelectionChange = (event) => {
    const value = event.target.value;
    setPageSelection(value);
    setIsCustomDisabled(value === "Tất cả");
  };

  const handleReset = () => {
    setPrinter("");
    setSize("A4");
    setFaces("2 mặt");
    setCopies("1");
    setPageSelection("Tất cả");
    setCustomPages("");
    setIsCustomDisabled(true);
  };

  const calculateTotalPages = () => {
    let totalPages = 0;

    if (pageSelection === "Tất cả") {
      totalPages = numPages;
    } else if (pageSelection === "Tùy chỉnh" && customPages) {
      const ranges = customPages.split(",").map((range) => {
        const [start, end] = range.split("-").map(Number);
        return end ? end - start + 1 : 1;
      });
      totalPages = ranges.reduce((total, pages) => total + pages, 0);
    }

    return totalPages;
  };

  const calculateTotalSheets = () => {
    const totalPages = calculateTotalPages();
    const totalCopies = parseInt(copies);

    let totalSheets;

    if (faces === "2 mặt") {
      totalSheets = Math.ceil(totalPages / 2) * totalCopies;
    } else {
      totalSheets = totalPages * totalCopies;
    }

    return totalSheets;
  };
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);

    setTimeout(() => {
      const pageHeights = Array.from(
        document.querySelectorAll(".react-pdf__Page"),
      ).map((page) => page.offsetHeight);

      setPageOffsets(pageHeights);

      setContainerHeight(pageHeights.reduce((sum, height) => sum + height, 0));
    }, 300);
  };
  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;

    let accumulatedHeight = 0;
    for (let i = 0; i < pageOffsets.length; i++) {
      accumulatedHeight += pageOffsets[i];

      if (scrollTop < accumulatedHeight) {
        setCurrentPage(i + 1);

        break;
      }
    }
  };
  const handlePrint = () => {
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const totalSheets = calculateTotalSheets();

    if (totalSheets > studentPaper) {
      alert("Bạn không đủ giấy để in.");
      return;
    }

    setIsPreviewVisible(true);
  };

  const handleConfirmPrint = async () => {
    if (!file) {
      alert("Vui lòng tải tệp lên trước khi in.");
      return;
    }

    const totalPages = calculateTotalPages();
    const totalCopies = parseInt(copies);
    const fileExtension = file.name.split(".").pop().toLowerCase();

    const printData = {
      ten_tep: file.name,
      loai_tep: fileExtension,
      duong_dan: `/${file.name}`,
      so_trang: totalPages,
      dinh_dang_trang_in: pageSelection,
      ma_may_in: activePrinters.find((p) => p.ten_may === printer)?.ma_may_in,
      so_ban_in: totalCopies,
      so_mat: faces === "2 mặt" ? 2 : 1,
      kich_thuoc: size,
    };

    if (pageSelection === "Tùy chỉnh") {
      const [gioi_han_duoi, gioi_han_tren] = customPages
        .split(",")
        .map((range) => {
          const [start, end] = range.split("-").map(Number);
          return [start, end ?? start];
        })
        .flat();

      printData.gioi_han_tren = gioi_han_tren;
      printData.gioi_han_duoi = gioi_han_duoi;
    }

    try {
      const response = await fetch(`${apiUrl}print/printConfirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(printData),
      });

      const data = await response.json();

      if (data.message === "Tạo đơn in thành công!") {
        alert("Đã gửi lệnh in thành công!");
      } else {
        alert(data.message);
      }

      setIsPreviewVisible(false);
    } catch (error) {
      alert("Đã xảy ra lỗi khi gửi lệnh in.");
    }
  };

  const handleClosePreview = () => {
    setIsPreviewVisible(false);
  };

  return (
    <div className="p-4 min-h-screen">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link to="/">bkssps.vn</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>In tài liệu</Breadcrumb.Item>
      </Breadcrumb>
      <div className="flex flex-col sm:flex-col md:flex-row gap-6 mb-10 mt-5">
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Tải tài liệu lên
          </h3>
          <div
            className={`border-dashed border-2 p-6 text-center ${
              isDragging ? "border-blue-500" : "border-gray-300"
            }h-auto`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept={acceptedDocuments.map((ext) => `.${ext}`).join(",")}
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-blue-500 hover:underline"
            >
              <img
                src={require("../../assets/upload.png")}
                alt="Upload"
                className="mx-auto w-12 h-12 mb-4"
              />
              Kéo thả tài liệu cần in vào đây hoặc click để chọn tài liệu
            </label>
            <p className="text-gray-500 text-sm mt-2">
              (Chỉ chấp nhận các định dạng: {acceptedDocuments.join(", ")})
            </p>
            {file && (
              <div className="mt-4">
                <p className="text-green-600">File đã chọn: {file.name}</p>
                <button
                  className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                  onClick={() => {
                    setFile(null);
                    setFileUrl(null);
                  }}
                >
                  Xóa file
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2">
          <h3 className="text-lg font-bold mb-4 text-gray-900">
            Xem trước tài liệu
          </h3>

          <div
            className="relative overflow-auto"
            style={{ maxHeight: "600px" }}
            onScroll={handleScroll}
          >
            <div style={{ width: "fit-content", margin: "0 auto" }}>
              {fileUrl ? (
                <Document file={fileUrl} onLoadSuccess={onDocumentLoadSuccess}>
                  {Array.from(new Array(numPages), (el, index) => (
                    <div key={`page_${index + 1}`} className="mb-4">
                      <Page pageNumber={index + 1} scale={scale} />
                    </div>
                  ))}
                </Document>
              ) : (
                <p className="text-gray-500">Chưa có tệp nào được chọn.</p>
              )}
            </div>
          </div>

          {fileUrl && (
            <div className="flex justify-between items-center mt-4">
              <Slider
                min={0.5}
                max={2.0}
                step={0.05}
                value={scale}
                onChange={(value) => setScale(value)}
                style={{ width: 200 }}
              />
              <p className="text-sm">Zoom: {(scale * 100).toFixed(0)}%</p>
              <p className="text-sm">
                Trang {currentPage} / {numPages}
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold mb-4 text-gray-900">
          Bảng điều khiển
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Chọn máy in
            </label>
            <select
              value={printer}
              onChange={(e) => setPrinter(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Chọn máy in</option>
              {activePrinters.map((printer) => (
                <option key={printer.ma_may_in} value={printer.ten_may}>
                  {printer.ten_may}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Chọn kích thước
            </label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="A4">A4</option>
              <option value="A3">A3</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Số mặt mỗi tờ
            </label>
            <select
              value={faces}
              onChange={(e) => setFaces(e.target.value)}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="1 mặt">1 mặt</option>
              <option value="2 mặt">2 mặt</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Số bản sao
            </label>
            <input
              type="number"
              value={copies}
              onChange={(e) => setCopies(e.target.value)}
              placeholder="Nhập số bản sao"
              min={1}
              className="block w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Chọn trang in
            </label>
            <select
              value={pageSelection}
              onChange={handlePageSelectionChange}
              className="block w-full p-2 border border-gray-300 rounded"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Tùy chỉnh">Tùy chỉnh</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-bold text-gray-700">
              Trang tùy chỉnh
            </label>
            <input
              type="text"
              value={customPages}
              onChange={(e) => setCustomPages(e.target.value)}
              placeholder="ex: 1-5, 8, 11-16"
              className="block w-full p-2 border border-gray-300 rounded"
              disabled={isCustomDisabled}
            />
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={handleReset}
          >
            Xóa cài đặt
          </button>

          <button
            className={`px-4 py-2 rounded transition duration-300 ${!printer ? "bg-gray-200 cursor-not-allowed text-gray-700" : "bg-blue-500 text-white hover:bg-blue-600"}`}
            onClick={handlePrint}
            disabled={!printer}
          >
            Bắt đầu in
          </button>
        </div>
      </div>

      <Modal
        title="Xem trước cài đặt in"
        visible={isPreviewVisible}
        onCancel={handleClosePreview}
        footer={[
          <button
            key="print"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleConfirmPrint}
          >
            In
          </button>,
          <button
            key="cancel"
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
            onClick={handleClosePreview}
          >
            Hủy
          </button>,
        ]}
      >
        <p>
          <strong>File:</strong> {file ? file.name : "Chưa chọn file"}
        </p>
        <p>
          <strong>Máy in:</strong> {printer || "Chưa chọn máy in"}
        </p>
        <p>
          <strong>Kích thước giấy:</strong> {size}
        </p>
        <p>
          <strong>Số mặt:</strong> {faces}
        </p>
        <p>
          <strong>Số bản sao:</strong> {copies}
        </p>
        <p>
          <strong>Số trang in/bản sao:</strong> {calculateTotalPages()}
        </p>
        <p>
          <strong>Số tờ in:</strong> {calculateTotalSheets()}
        </p>
        <p>
          <strong>Chọn trang in:</strong> `
          {pageSelection === "Tùy chỉnh" ? customPages : pageSelection}
        </p>
      </Modal>
    </div>
  );
};

export default ServicePage;
