import mark from '../../assets/mark.png';

function BuyFailPage ({ isSuccess, onRetry }){
	return(
		<>
			<div>
                <img className="h-16 w-16 mx-auto mb-4" src={mark} alt="fail"/>
                <h2 className="text-2xl font-bold text-[#006688]">Thanh toán thất bại!</h2>
                <p className="mt-6 mb-12 h-8 w-400 mx-auto">
                  Đơn hàng của bạn đã thanh toán thất bại. Vui lòng kiểm tra kỹ các thông tin hoặc liên hệ chúng tôi nếu đây là lỗi.
                </p>
              </div>

			  <div className="mt-6 space-x-4">
              <button onClick={onRetry} className="px-4 py-2 bg-white text-[#444444] font-semibold rounded-md hover:bg-[#cac9c9]">
                Mua thêm trang
              </button>
              <button className="px-4 py-2 bg-[#0688B4] text-white font-semibold rounded-md hover:bg-[#0b6986]">
                Liên hệ hỗ trợ
              </button>
            </div>
		</>
	)
}

export default BuyFailPage