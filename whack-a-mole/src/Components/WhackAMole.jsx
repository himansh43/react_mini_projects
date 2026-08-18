import { useEffect } from "react";
import Cell from "./Cell";
import { useState } from "react";

const WhackAMole = () => {
  const generateRandomPosition = () => {
    return [Math.floor(Math.random() * 3), Math.floor(Math.random() * 3)];
  };
  const [molePos, setMolePos] = useState(generateRandomPosition());
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setMolePos(generateRandomPosition());
    }, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <h2 className="text-center mt-10 font-bold ">Score: {score}</h2>
      <div className="flex  justify-center items-center mt-5 ">
        {Array.from({ length: 3 }, (_, index) => index).map((item, row) => (
          <div key={row}>
            {Array.from({ length: 3 }, (_, index) => index).map(
              (item, column) => (
                <div key={column}>
                  <Cell
                    row={row}
                    column={column}
                    molePos={molePos}
                    setMolePos={setMolePos}
                    setScore={setScore}
                    generateRandomPosition={generateRandomPosition}
                  />
                </div>
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default WhackAMole;
