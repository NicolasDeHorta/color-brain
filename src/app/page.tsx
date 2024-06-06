"use client";
import { useState } from "react";
import { getColors } from "@/utils";

const Home = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const getNewColors = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    const colors = await getColors(prompt);
    if (colors.colors.length > 7) {
      setColors(colors.colors.slice(0, 7));
    } else {
      setColors(colors.colors);
    }
    setLoading(false);
  };

  return (
    <main className="relative flex flex-col items-center justify-between w-full  h-screen bg-gradient-to-br to-black via-blue-900 from-purple-900 md:p-4 p-2">
      <div className="w-full h-10 mt-4 bg-slate-800 text-white flex justify-start items-center p-6 shadow-md rounded-full">
        <h1>Color BrAIn</h1>
      </div>
      {colors.length > 0 && (
        <div
          style={{ display: "grid", gridTemplateColumns: `repeat(${colors.length}, 1fr)` }}
          className={`w-full h-full md:gap-4 p-2 md:grid-cols-1`}>
          {colors.map((c) => (
            <div
              onClick={() => navigator.clipboard.writeText(c)}
              key={c}
              style={{ background: c }}
              className="flex-col h-full w-full rounded-lg flex justify-end items-center md:p-6 text-xs md:text-lg group hover:brightness-105 cursor-pointer">
              <div className="group-hover:inline hidden text-white drop-shadow-[0_1.3px_1.3px_rgba(0,0,0,0.9)]">
                copy
              </div>
              <div className="text-white flex drop-shadow-[0_1.3px_1.3px_rgba(0,0,0,0.9)]">{c}</div>
            </div>
          ))}
        </div>
      )}
      <div className="absolute top-1/2 md:top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center overflow-hidden  flex-col items-center gap-4 border border-gray-700 bg-black bg-opacity-60 w-11/12 h-fit md:h-fit md:w-1/2 p-10 rounded-md shadow-lg backdrop-blur-lg ">
        <p className="text-white text-center">
          Imagine a concept, visualize an idea, or picture an image, and describe it. <br />
          <b>Color BrAIn</b> will transform your thoughts into a stunning color palette just for you.
        </p>
        <form
          onSubmit={getNewColors}
          className="w-full flex justify-center flex-col md:gap-4 gap-12 mt-12 items-center">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-lg bg-gray-50 border-2 w-full md:w-2/3 border-gray-300 text-gray-900 rounded-lg focus:ring-gray-500 focus:border-gray-500 block p-2.5 "
          />
          <button
            type="submit"
            onClick={getNewColors}
            className="border flex gap-2 items-center justify-center border-gray-500 text-white hover:bg-gray-800 focus:ring-2 focus:outline-none focus:ring-gray-600 font-medium rounded-lg text-sm w-full sm:w-auto px-20 py-2.5 text-center">
            {loading && (
              <div className="w-4 h-4 border-2 border-b-transparent border-t-transparent border-white animate-spin rounded-full"></div>
            )}
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default Home;
