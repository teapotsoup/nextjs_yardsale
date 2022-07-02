import { NextPage } from "next";

const Streams: NextPage = () => {
  return (
    <div className="py-10 px-4 divide-y-2 space-y-4">
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
        <div className="pt-4 px-4" key={i}>
          {/* 자동으로 높이를 지정해주는 aspect-video, aspect-square */}
          <div className="w-full rounded-md shadow-md bg-slate-300 aspect-video" />
          <h3 className=" text-gray-700 text-lg mt-2">
            Let&apos;s try potatos
          </h3>
        </div>
      ))}
      <button className="border-transparent fixed text-white hover:bg-orange-500 transition-colors cursor-pointer bottom-24 right-5 shadow-xl bg-orange-400 p-4 rounded-full text-center">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          ></path>
        </svg>

      </button>
    </div>
  );
};

export default Streams;
