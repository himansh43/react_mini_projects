import { useState } from "react";
import data from "./data.json";
const App = () => {
  const faqKeys = Object.keys(data);
  const faqArr = data[faqKeys];
  console.log("data is", data);
  const [showIndex, setShowIndex] = useState(null);
  const handleIndex = (index) => {
    console.log("index is", index);
    setShowIndex((prev) => {
      if (prev === index) {
        return null;
      }
      return index;
    });
  };
  return (
    <div className="flex flex-col justify-center items-center mt-10 ">
      <h2 className="text-2xl font-bold mb-5">FAQ</h2>
      <div className="flex flex-col gap-3 w-1/2 ">
        {faqArr.map((item, index) => (
          <div
            key={index}
            className="flex flex-col  justify-between items-center border px-3 py-1"
          >
            <div className="flex w-full justify-between border-amber-400">
              <div>{item.question}</div>
              <div>
                <button onClick={() => handleIndex(index)}>
                  {index === showIndex ? "-" : "+"}
                </button>
              </div>
            </div>
            {index === showIndex ? <p>{item.answer}</p> : ""}
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
