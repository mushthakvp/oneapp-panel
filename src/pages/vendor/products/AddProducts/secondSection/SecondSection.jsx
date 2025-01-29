import React from 'react'
import PlusMinusButton from '../PlusMinusButton';

function SecondSection({ specification, setSpecification }) {
    const handleAdd = () => {
         setSpecification([...specification, { title: "", solution: "" }]);
    };
    const handleRemove = (index) => {
        const updatedSpecification = [...specification];
        updatedSpecification.splice(index, 1);
        setSpecification(updatedSpecification);
    };
  return (
    <div className="bg-containerWhite p-4 sm:p-[30px] font-urbanist w-full border border-inputBorder rounded-md">
      <h1 className="text-[20px] font-[500] mb-[32px]">Specifications</h1>
      <div className="grid grid-cols-1 gap-[22px]">
        {specification?.map((data, index) => {
          return (
            <div className="flex w-full flex-col sm:flex-row items-end gap-3 ">
              <div className="w-full ">
                <p className="mb-[8px]">Specification Name</p>
                <input
                  type="text"
                  placeholder="Ex: Fabric"
                  value={data?.title}
                  onChange={(e) => {
                    const newSpecification = [...specification];
                    newSpecification[specification.indexOf(data)] = {
                      ...data,
                      title: e.target.value,
                    };
                    setSpecification(newSpecification);
                  }}
                  className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
                />
              </div>
              <div className="w-full ">
                <p className="mb-[8px]">Specification Contents</p>
                <input
                  type="text"
                  placeholder="Ex: Cotton"
                  value={data?.solution}
                  onChange={(e) => {
                    const newSpecification = [...specification];
                    newSpecification[specification.indexOf(data)] = {
                      ...data,
                      solution: e.target.value,
                    };
                    setSpecification(newSpecification);
                  }}
                  className="w-full h-12 border border-inputBorder rounded-md px-3 bg-transparent outline-none"
                />
              </div>
              <div className="flex items-end justify-end gap-2 ">
                <PlusMinusButton
                  callBack={handleAdd}
                  icon={
                    <svg
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.7647 8.545H9.47059V1.23578C9.47059 1.10563 9.36518 1 9.23529 1H8.76471C8.63482 1 8.52941 1.10563 8.52941 1.23578V8.545H1.23529C1.10541 8.545 1 8.65063 1 8.78078V9.25234C1 9.38249 1.10541 9.48812 1.23529 9.48812H8.52941V16.7973C8.52941 16.927 8.63482 17.0331 8.76471 17.0331H9.23529C9.36518 17.0331 9.47059 16.927 9.47059 16.7973V9.48812H16.7647C16.8941 9.48812 17 9.38249 17 9.25234V8.78078C17 8.65063 16.8941 8.545 16.7647 8.545Z"
                        fill="white"
                        stroke="white"
                        stroke-width="2"
                      />
                    </svg>
                  }
                />
                {index > 0 && (
                  <PlusMinusButton
                    callBack={() => handleRemove(index)}
                    icon={
                      <svg
                        width="20"
                        height="2"
                        viewBox="0 0 20 2"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 1H19"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                        />
                      </svg>
                    }
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SecondSection
