import { useEffect, useRef, useState } from "react";

const App = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerId = useRef(null);

  const handleInput = (e, field) => {
    console.log(field, e.target.value);
    const value = parseInt(e.target.value, 10) || 0;
    if (!/^\d*$/.test(value)) return;
    const copyTime = { ...time };
    copyTime[field] = value;
    copyTime.minutes = copyTime.minutes + Math.floor(copyTime.seconds / 60);
    copyTime.seconds = copyTime.seconds % 60;
    copyTime.hours = copyTime.hours + Math.floor(copyTime.minutes / 60);
    copyTime.minutes = copyTime.minutes % 60;
    setTime(copyTime);
  };

  const handleStart = () => {
    if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) return;
    setIsTimerRunning(true);
  };

  useEffect(() => {
    if (!isTimerRunning) return;
    timerId.current = setInterval(() => {
      setTime((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          setIsTimerRunning(false);
          return prev;
        }
        const copyTime = { ...prev };
        if (copyTime.seconds > 0) {
          copyTime.seconds--;
        } else if (copyTime.minutes > 0) {
          copyTime.minutes--;
          copyTime.seconds = 59;
        } else if (copyTime.hours > 0) {
          copyTime.hours--;
          copyTime.minutes = 59;
        }
        return copyTime;
      });
    }, 1000);
    return () => {
      clearInterval(timerId.current);
    };
  }, [isTimerRunning]);

  const handleReset = () => {
    setIsTimerRunning(false);
    setTime({
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="flex flex-col gap-7 ">
        <h2 className="font-bold text-2xl">CountDown Timer</h2>
        <div className="flex gap-3 items-center justify-center">
          <input
            type="text"
            placeholder="HH"
            onChange={(e) => handleInput(e, "hours")}
            className="w-12 h-12 border text-center rounded-sm outline-0"
            value={time.hours}
          />
          :
          <input
            type="text"
            placeholder="MM"
            onChange={(e) => handleInput(e, "minutes")}
            className="w-12 h-12 border text-center rounded-sm outline-0"
            value={time.minutes}
          />
          :
          <input
            type="text"
            placeholder="SS"
            onChange={(e) => handleInput(e, "seconds")}
            className="w-12 h-12 border text-center rounded-sm outline-0"
            value={time.seconds}
          />
        </div>
        <div className="flex gap-5 items-center justify-center">
          <button
            className="border w-20 rounded-sm bg-green-500 text-white px-3 py-1"
            onClick={handleStart}
            disabled={isTimerRunning}
          >
            Start
          </button>
          <button
            onClick={handleReset}
            className="border w-20 rounded-sm bg-red-500 text-white px-3 py-1"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default App;
