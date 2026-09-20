import { useEffect, useRef, useState } from "react";
import data from "./data.json";

const App = () => {
  const [index, setIndex] = useState(0);
  const timerId = useRef(null);

  const handlePrev = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    } else {
      setIndex(data.length - 1);
    }
  };

  const handleNext = () => {
    setIndex((prev) => {
      if (prev === data.length - 1) return 0;
      return prev + 1;
    });
  };
  const startTimer = () => {
    timerId.current = setInterval(handleNext, 1000);
  };

  const stopTimer = () => {
    clearInterval(timerId.current);
  };

  useEffect(() => {
    startTimer();
    return () => {
      stopTimer();
    };
  }, []);

  return (
    <div className="flex justify-center items-center border-green w-screen h-screen">
      <div className="flex flex-col relative  w-1/2 h-1/2">
        <div
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          className="w-full h-full"
        >
          {
            <img
              src={data[index].download_url}
              alt="post-image"
              className="w-full h-full object-cover"
            />
          }
        </div>

        <button
          className="bg-yellow-500 px-3 py-1 rounded-sm absolute  left-5 top-1/2"
          onClick={handlePrev}
        >
          Prev
        </button>
        <button
          className="bg-yellow-500 px-3 py-1 rounded-sm absolute right-5 top-1/2"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};
export default App;
