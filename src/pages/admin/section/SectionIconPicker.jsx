import { Modal } from '@mui/material';
import React from 'react'
import { toast } from 'react-toastify';
const section = [
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731479058/Vcart/slobqdkiuresjotwzxw7.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731479204/Vcart/k4yvdx6dk7uzgvs0uoxa.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731479727/Vcart/zeucdoeancala0ni3ma8.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731479879/Vcart/afa5e3iiuky9cyfxliyl.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731480005/Vcart/namnsem2r8zqr7s7pihi.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731480437/Vcart/j3lr2gqrnfy5xi87z7p2.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731480556/Vcart/byqdmlzuvj8ia2dbm0zy.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731480675/Vcart/x0hdjclyyex7x9tvo3yp.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731480798/Vcart/ytw5juazlx6usxoutc0c.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731483343/Vcart/xpyv6lxpxbtpby36eo3m.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731483459/Vcart/ejswrpmgrh9g3rjkwxdq.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731483549/Vcart/thznd8r5wfnbrj7y5u3u.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731483668/Vcart/borl4oriekodbrlsdyoq.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731483788/Vcart/y2mgorop4m1f8rijzjaj.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731483865/Vcart/lzuakatbaikjniwgfoph.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731483949/Vcart/nijz75ehky47gztibdhu.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731483949/Vcart/ijlole0cyrxj0lybwmro.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731484108/Vcart/c4yk2awgorpsoxrrrfsa.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731484514/Vcart/qflf79zolwofa0uflgd3.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731484515/Vcart/lbdiasnegcwoeju9ep4x.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731484514/Vcart/oeyrqii3j3nbbu6u7hbh.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731484805/Vcart/rogc8xhttegxhpinouk1.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731484953/Vcart/afvyf6nhdtvlvykucpcx.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485090/Vcart/mvgxmdz52ihgzpkosuq3.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485108/Vcart/xy5frnxyewmhivg8tpfc.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485143/Vcart/btshkrupeqwl1q4inhg0.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485159/Vcart/ztmbc8n6vevzloie3bpb.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485159/Vcart/zwhjdd3uth6d3suaksrn.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485175/Vcart/gcnl9y7jlpafvnbvstmm.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485776/Vcart/wcjbhutjcuzy2iyeszw1.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485787/Vcart/rkizuxhteaoonsbduyqm.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485802/Vcart/azmp0sxnsyvgrjrlee1v.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485816/Vcart/hx0q5yyl79ljpfmp2xmw.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485831/Vcart/sic9r6aruseyfgu4mlpn.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485832/Vcart/jwowehg0gnmjxquoiyhc.png",
  "https://res.cloudinary.com/dsvuvx1iq/image/upload/v1731485833/Vcart/krjwhaw2emgucf202fmv.png",
];

function SectionIconPicker({postData,setPostData}) {
  const [open, setOpen] = React.useState(false);
 
  return (
    <div className="flex items-center">
      <div className="w-full max-[30%]">
        Select Icon <span className="text-buttonColor">*</span>
      </div>
      <div
        onClick={() => setOpen(true)}
        className={`w-full cursor-pointer min-w-[70%] border-2 border-dashed relative  bg-transparent rounded-md h-[252px] flex flex-col items-center justify-center gap-[30px] overflow-hidden`}
      >
        {postData?.image ? (
          <div className="w-[140px] h-[125px] flex items-center justify-center cursor-pointer p-1 bg-[#F9F9F9] border border-inputBorder rounded-md">
            <img src={postData?.image} alt="" className="w-[50px] h-[50px]" />
          </div>
        ) : (
          <>
            <svg
              width="58"
              height="58"
              viewBox="0 0 58 58"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M31.4355 45.1992V35.5137H38.6855L29 23.4492L19.3145 35.5137H26.5645V45.1992H31.4355ZM16.9355 45.1992H21.75V40.3848H16.9355C14.9342 40.3848 13.2256 39.6673 11.8096 38.2324C10.3936 36.7975 9.68555 35.0983 9.68555 33.1348C9.68555 31.4355 10.318 29.8685 11.583 28.4336C12.848 26.9987 14.3678 26.1302 16.1426 25.8281L17.5586 25.6016L18.0117 24.2422C18.8424 21.75 20.249 19.7865 22.2314 18.3516C24.2139 16.9167 26.4701 16.1992 29 16.1992C30.6615 16.1992 32.2285 16.5202 33.7012 17.1621C35.1738 17.7663 36.4577 18.6159 37.5527 19.7109C38.6478 20.806 39.5163 22.0898 40.1582 23.5625C40.7624 25.0352 41.0645 26.6022 41.0645 28.2637V30.6992H43.5C44.8216 30.6992 45.9544 31.1712 46.8984 32.1152C47.8424 33.0592 48.3145 34.1921 48.3145 35.5137C48.3145 36.8353 47.8424 37.9775 46.8984 38.9404C45.9544 39.9033 44.8216 40.3848 43.5 40.3848H36.25V45.1992H43.5C46.181 45.1992 48.4655 44.2552 50.3535 42.3672C52.2415 40.4792 53.1855 38.1947 53.1855 35.5137C53.1855 33.248 52.487 31.2562 51.0898 29.5381C49.6927 27.82 47.9368 26.6966 45.8223 26.168L45.7656 26.1113C45.5013 24.0345 44.8783 22.1087 43.8965 20.334C42.9525 18.5215 41.7347 16.9544 40.2432 15.6328C38.7516 14.3112 37.043 13.2728 35.1172 12.5176C33.1914 11.7624 31.1523 11.3848 29 11.3848C27.3385 11.3848 25.7337 11.6113 24.1855 12.0645C22.6751 12.5176 21.2686 13.1784 19.9658 14.0469C18.6631 14.9154 17.4831 15.9727 16.4258 17.2188C15.4062 18.4648 14.5755 19.862 13.9336 21.4102C11.3281 22.1654 9.1569 23.6475 7.41992 25.8564C5.68294 28.0654 4.81445 30.4915 4.81445 33.1348C4.81445 34.7962 5.13542 36.3444 5.77734 37.7793C6.41927 39.252 7.28776 40.5358 8.38281 41.6309C9.47786 42.7259 10.7617 43.5944 12.2344 44.2363C13.707 44.8783 15.2741 45.1992 16.9355 45.1992Z"
                fill="#2f4eff0f"
              />
            </svg>
            <div className="w-full text-center ">
              <h1 className="text-[18px] font-[600]">Select Icon</h1>
              <p className="text-[#5D7186] text-[13px] mt-2">
                Please select your correct icon for Section
              </p>
            </div>
          </>
        )}
      </div>
      <Modal
        className="flex items-center justify-center"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="bg-containerWhite w-full rounded-md max-w-[614px] overflow-hidden flex flex-col items-center justify-center">
          <h1 className="p-3 text-[16px] font-[600] text-center border-b border-inputBorder w-full">
            Select Icon
          </h1>
          <div className="p-[26px] w-full grid grid-cols-7 sm:grid-cols-9 gap-7">
            {section?.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setPostData({ ...postData, image: item });
                  
                }}
                className="w-[50px] h-[50px] flex items-center justify-center cursor-pointer p-1 bg-[#F9F9F9] border border-inputBorder rounded-md"
              >
                <img src={item} alt="" className="w-[24px] h-[24px]" />
              </div>
            ))}
          </div>
          <button onClick={() => {
            if (postData?.image) {
              setOpen(false);
            } else {
              toast.error("Please select icon");
            }
          }} className="w-full max-w-[365px] bg-buttonColor flex items-center justify-center text-white h-10 rounded-md md:h-12 mb-5">
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default SectionIconPicker
