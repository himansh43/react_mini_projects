import { useState } from "react";
import data from "./data";

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [tabsData, setTabsData] = useState(data);
  const handleClick = (index) => {
    setTabIndex(index);
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col border w-1/2 h-1/2">
        <div className=" flex  w-full">
          {tabsData.map((item, index) => (
            <div key={index} className="w-full">
              <button onClick={() => handleClick(index)} className="border w-full ">{item.label}</button>
            </div>
          ))}
        </div>
        <div className="flex justify-center items-center h-full">{tabsData[tabIndex].component}</div>
      </div>
    </div>
  );
};
export default App;
