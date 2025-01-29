import React, { useEffect } from 'react'
import Brand from '../dropDownSection/brand/Brand';
import Section from '../dropDownSection/Section';
import Category from '../dropDownSection/category/Category';
import SubSection from '../dropDownSection/subSection/SubSection';
import StateSelection from '../dropDownSection/StateSelection';

function ProductFirstSection({
  setProduct,
  product,
  selectedBrandName,
  selectedStates,
  setSelectedStates,
}) {
  
  useEffect(() => {
    setProduct((prev) => ({ ...prev, states: selectedStates }));
  }, [selectedStates]);
  return (
    <div className="bg-containerWhite p-4 sm:p-[30px] font-urbanist w-full border border-inputBorder rounded-md">
      <h1 className="text-[20px] font-[500] mb-[32px]">Basic Information</h1>
      <div className="flex flex-col gap-[20px] text-[16px] font-[500]">
        <div className="">
          <p className="mb-[8px]">Brand</p>
          <Brand
            selected={product}
            setSelected={setProduct}
            selectedBrandName={selectedBrandName}
          />
        </div>
        {/* name andSection */}
        <div className="flex items-center gap-[17px] w-full ">
          <div className="w-full ">
            <p className="mb-[8px]">Product Name</p>
            <input
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="Enter product Name"
              className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
            />
          </div>
          <div className="w-full max-w-[266px]">
            <p className="mb-[8px]">Section</p>
            <Section selected={product} setSelected={setProduct} />
          </div>
        </div>
        {/* descr */}
        <div className="w-full ">
          <p className="mb-[8px]">Product Description</p>
          <textarea
            type="text"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            placeholder="Enter product Name"
            className="w-full h-[72px] border border-inputBorder rounded-md p-3 bg-transparent outline-none"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-[26px] w-full ">
          <div className="w-full ">
            <p className="mb-[8px]">Category</p>
            <Category selected={product} setSelected={setProduct} />
          </div>
          <div className="w-full ">
            <p className="mb-[8px]">Subcategory</p>
            <SubSection selected={product} setSelected={setProduct} />
          </div>
        </div>

        <div className="w-full ">
          <p className="mb-[8px]">State</p>
          <StateSelection
            selected={selectedStates}
            setSelected={setSelectedStates}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductFirstSection
