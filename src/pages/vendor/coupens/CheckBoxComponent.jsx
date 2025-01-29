import React from 'react'

function CheckBoxComponent({selected,setSelected}) {
  
    
  return (
    <div className="flex items-center gap-4 font-urbanist py-3 ">
      <h1 className="text-[14px] md:text-[18px] font-[600] text-buttonColor">
        *This Coupon will show in user App
      </h1>
      <div className="flex items-center gap-2">
        <div
          type="checkbox"
          onClick={() => {
            setSelected({
              ...selected,
              isShowInUser: true,
            });
          }}
          className={`${
            selected?.isShowInUser ? "bg-buttonColor" : "bg-transparent"
          } w-5 h-5 border cursor-pointer border-buttonColor rounded-md flex items-center justify-center`}
        >
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.83182 6.83193C3.74224 6.83421 3.65313 6.81833 3.56986 6.78525C3.48659 6.75217 3.41087 6.70257 3.34728 6.63944L0.194514 3.48667C0.0699688 3.36212 -1.31229e-09 3.19321 0 3.01707C1.31229e-09 2.84094 0.0699688 2.67202 0.194514 2.54748C0.319059 2.42293 0.487978 2.35296 0.664111 2.35296C0.840244 2.35296 1.00916 2.42293 1.13371 2.54748L3.81854 5.23231L8.86629 0.194514C8.92796 0.132845 9.00117 0.0839268 9.08175 0.0505521C9.16232 0.0171774 9.24868 6.49782e-10 9.33589 0C9.4231 -6.49783e-10 9.50946 0.0171774 9.59003 0.0505521C9.67061 0.0839268 9.74382 0.132845 9.80549 0.194514C9.86716 0.256182 9.91607 0.329393 9.94945 0.409966C9.98282 0.49054 10 0.576898 10 0.66411C10 0.751323 9.98282 0.837681 9.94945 0.918254C9.91607 0.998828 9.86716 1.07204 9.80549 1.13371L4.29975 6.63944C4.17531 6.76287 4.00709 6.83207 3.83182 6.83193Z"
              fill="white"
            />
          </svg>
        </div>
        <p>Yes</p>
      </div>
      <div className="flex items-center gap-2">
        <div
          type="checkbox"
          onClick={() => {
            setSelected({
              ...selected,
              isShowInUser: false,
            });
          }}
          className={`${
            !selected?.isShowInUser ? "bg-buttonColor" : "bg-transparent"
          } w-5 h-5 border cursor-pointer border-buttonColor rounded-md flex items-center justify-center`}
        >
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.83182 6.83193C3.74224 6.83421 3.65313 6.81833 3.56986 6.78525C3.48659 6.75217 3.41087 6.70257 3.34728 6.63944L0.194514 3.48667C0.0699688 3.36212 -1.31229e-09 3.19321 0 3.01707C1.31229e-09 2.84094 0.0699688 2.67202 0.194514 2.54748C0.319059 2.42293 0.487978 2.35296 0.664111 2.35296C0.840244 2.35296 1.00916 2.42293 1.13371 2.54748L3.81854 5.23231L8.86629 0.194514C8.92796 0.132845 9.00117 0.0839268 9.08175 0.0505521C9.16232 0.0171774 9.24868 6.49782e-10 9.33589 0C9.4231 -6.49783e-10 9.50946 0.0171774 9.59003 0.0505521C9.67061 0.0839268 9.74382 0.132845 9.80549 0.194514C9.86716 0.256182 9.91607 0.329393 9.94945 0.409966C9.98282 0.49054 10 0.576898 10 0.66411C10 0.751323 9.98282 0.837681 9.94945 0.918254C9.91607 0.998828 9.86716 1.07204 9.80549 1.13371L4.29975 6.63944C4.17531 6.76287 4.00709 6.83207 3.83182 6.83193Z"
              fill="white"
            />
          </svg>
        </div>
        <p>No</p>
      </div>
    </div>
  );
}

export default CheckBoxComponent
