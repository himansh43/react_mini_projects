import { useState } from "react";
import data from "./data";

const App = () => {
  const [activeId, setActiveId] = useState(null);
  const handleClick = (index) => {
    setActiveId(activeId === index ? null : index);
  };
  return (
    <div className="flex justify-center items-center">
      <div className=" flex flex-col gap-3 mt-5 w-1/2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col px-3 py-2 border">
            <div className="flex items-center justify-between">
              <p>{item.question}</p>
              <button
                className="text-xl w-10"
                onClick={() => handleClick(index)}
              >
                {activeId === index ? "-" : "+"}
              </button>
            </div>
            {activeId === index && <div>{item.answer}</div>}
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
