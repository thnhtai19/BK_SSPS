import React, { useState, useEffect, useRef } from 'react';
import SlidebarComponent from '../../components/SlidebarComponent/SlidebarComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import { WrapperContainer, WrapperSlidebar, ContentContainer, Overlay } from '../HomePage/style';
import { RightOutlined } from '@ant-design/icons';

const BuyPage = () =>{
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <WrapperContainer>
      <Overlay isOpen={isOpen} onClick={() => setIsOpen(false)} />
      <WrapperSlidebar isOpen={isOpen} ref={sidebarRef}>
        <SlidebarComponent curentpage={"5"} />
      </WrapperSlidebar>
      <ContentContainer isOpen={isOpen}>
        <HeaderComponent isOpen={isOpen} setIsOpen={setIsOpen} />
        <div>
          <p className="px-5">bkssps.vn <RightOutlined /> Mua thêm giấy</p>
          <div className="flex justify-evenly	">
            <section className="flex-none h-auto w-600 mt-12 mx-5 p-7 border border-solid rounded-2xl bg-white">
              <form>
                <fieldset className="space-y-6"> {/* Khoảng cách giữa các label */}
                  <legend className="font-bold text-xl mb-2">Mua thêm trang</legend>
                  
                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Mã số sinh viên</span>
                    <input
                      type="text"
                      placeholder="Nhập MSSV"
                      className="w-full h-10 px-3 bg-[#f2efef] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</span>
                    <input
                      type="text"
                      placeholder="Nhập tên sinh viên"
                      className="w-full h-10 px-3 bg-[#f2efef] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </label>

                  <label className="block">
                    <span className="block text-sm font-medium text-gray-700 mb-2">Số trang mua</span>
                    <input
                      type="text"
                      placeholder="Nhập số trang cần mua"
                      className="w-full h-10 px-3 bg-[#f2efef] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </label>
                </fieldset>

                <button
                  type="submit"
                  className="w-full mt-6 px-4 py-2 bg-[#0688B4] text-white font-semibold rounded-md shadow hover:bg-[#046e92] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  Submit
                </button>
              </form>
            </section>

            <section className="flex-none h-auto w-600 mt-12 mx-5 p-7 border border-solid rounded-2xl bg-white">
            
            </section>
          </div>
                  
        </div>
      </ContentContainer>
    </WrapperContainer>
  );
}

export default BuyPage;