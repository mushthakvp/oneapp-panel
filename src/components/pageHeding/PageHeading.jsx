import React from 'react'

function PageHeading({title}) {
  return (
    <div>
      <h1 className="font-[500] text-[20px] sm:text-[28px] leading-[33.6px] tracking-[-0.38px] font-urbanist">
        {title}
      </h1>
    </div>
  );
}

export default PageHeading
