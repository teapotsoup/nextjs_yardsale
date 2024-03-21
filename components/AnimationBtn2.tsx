import React from 'react';

interface Btn2Props {
  width: string,
  height: string,
  loading:boolean
}

const AnimationBtn2: React.FC<Btn2Props> = ({ width, height, loading }) => {
  return (
      <button className="relative overflow-hidden rounded-full font-bold text-lg text-gray-800 bg-white border-2 border-gray-200 transition duration-200 ease-in-out transform hover:scale-1.05 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              style={{ width: width, height: height }}>
        {loading ? "Loading" : "Get login link"}
        <span className="absolute inset-0 bg-blue-500 rounded-full transform -translate-x-full rotate-10 transition duration-200 ease-out"></span>
      </button>
  );
};

export default AnimationBtn2;
