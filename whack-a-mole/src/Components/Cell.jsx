
import { useState } from "react";

const Cell = ({ molePos, setMolePos, row, column,setScore,generateRandomPosition }) => {
  const [showHammer, setShowHammer] = useState(false);
  const handleClick=()=>{
    setShowHammer(true)
    if(row===molePos[0]&& column===molePos[1]){
        setScore((prev)=>prev+1)
        setTimeout(()=>{setMolePos(generateRandomPosition())},100)
    }
    setTimeout(()=>{
        setShowHammer(false)
    },300)
  }

  return (
    <div
      className="flex flex-col justify-center items-center border-2 w-20 h-20 relative"
      onClick={handleClick}
    >
      {row === molePos[0] && column === molePos[1] && (
        <div>
          <div className="text-2xl">
            
            👻
          </div>
        </div>
      )}
      {showHammer && (
        <div className="absolute top-5 right-3 text-3xl">
          🔨
        </div>
      )}
    </div>
  );
};
export default Cell;
