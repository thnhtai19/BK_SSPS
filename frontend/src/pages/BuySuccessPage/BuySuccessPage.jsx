import check from '../../assets/check.png';
import { useNavigate } from 'react-router-dom';

const BuySuccessPage = () => {
  const navigate = useNavigate();

	return(
		<>
      <div className="mt-16 text-center">
        <div>
          <img className="h-16 w-16 mx-auto mb-4" src={check} alt="success"/>
          <h2 className="text-2xl font-bold text-[#006688]">Thanh toán thành công!</h2>
          <p className="mt-6 mb-12 h-8 w-400 mx-auto">
            Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, bạn đã được cộng số trang in vào trong tài khoản!
          </p>
        </div>

        <div className="mt-6 space-x-4">
          <button onClick={() => navigate("/buy")} className="px-4 py-2 bg-white text-[#444444] font-semibold rounded-md hover:bg-[#cac9c9]">
            Mua thêm trang
          </button>
          <button className="px-4 py-2 bg-[#0688B4] text-white font-semibold rounded-md hover:bg-[#0b6986]">
            In tài liệu
          </button>
        </div>
      </div>
		</>
	)
}

export default BuySuccessPage