import { useState } from "react";
import "./App.css";

const App = () => {
  const [allStars, setAllStars] = useState(Array.from({ length: 10 }))
  const [starValue, setStarValue] = useState("");
  const [hoverValue, setHoverValue] = useState("");

  console.log("star value is", starValue);
  console.log("hoverValue is", hoverValue);
  return (
    <div className="flex flex-col justify-center items-center  mt-10">
      <h2 className="text-2xl font-bold">Star Rating</h2>
      <div className="flex gap-3">
        {allStars.map((star, index) => (
          <div
            key={index}
            className={`text-4xl ${(hoverValue == 0 && starValue > index) || hoverValue > index ? "golden" : ""}`}
            onClick={() => setStarValue(index + 1)}
            onMouseEnter={(e) => setHoverValue(index + 1)}
            onMouseLeave={(e) => setHoverValue(0)}
            
          >
            &#9733;
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
