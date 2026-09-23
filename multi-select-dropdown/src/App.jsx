import { useEffect, useRef } from "react";
import { useState } from "react";
import data from "./data";

const App = () => {
  const [languages, setLanguages] = useState(data);
  const [searchInput, setSearchInput] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const modalRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  const filteredLanguage = languages.filter((language) => {
    return language.label.toLowerCase().includes(searchInput);
  });

  const handleSelectLanguage = (selectLanguage) => {
    console.log("select language is", selectLanguage);
    setSelectedLanguage((prev) => {
      return prev.some((item) => item.id === selectLanguage.id)
        ? prev.filter((item) => item.id !== selectLanguage.id)
        : [...prev, selectLanguage];
    });
  };

  const handleRemoveLanguage = (removeLanguage) => {
    setSelectedLanguage((prev) => {
      const filteredLanguage = prev.filter(
        (item) => item.id !== removeLanguage.id,
      );
      return filteredLanguage;
    });
  };
  console.log("searchInput is", searchInput);

  const handleClearAll = () => {
    setSelectedLanguage([]);
  };

  const handleCloseModal = (e) => {
    if (!modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, [showModal]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col gap-2 mt-5" ref={modalRef}>
        <h2 className="text-center font-medium text-xl">
          Multi-select-dropdown
        </h2>

        <div className="border rounded-sm p-3 flex flex-col">
          {selectedLanguage.length < 1 && (
            <p className="text-center" onClick={() => setShowModal(!showModal)}>
              Select Options
            </p>
          )}
          <div className="flex flex-wrap gap-3 w-96 ">
            {selectedLanguage.map((item) => (
              <div
                key={item.id}
                className="flex bg-blue-400  text-white gap-3 px-3 rounded-sm justify-center items-center"
              >
                <p>{item.label}</p>
                <button onClick={() => handleRemoveLanguage(item)}>X</button>
              </div>
            ))}
            {selectedLanguage.length > 1 && (
              <div>
                <button
                  className="px-3 bg-blue-400 text-white rounded-sm"
                  onClick={handleClearAll}
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {showModal && (
          <div className="flex flex-col gap-5 border rounded-sm p-3">
            <input
              type="text"
              placeholder="Search here"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="outline-none border rounded-sm px-2 py-1"
            />

            <div>
              {filteredLanguage.map((item) => (
                <div key={item.id} className="flex gap-2">
                  <input
                    type="checkbox"
                    id={item.id}
                    onChange={() => handleSelectLanguage(item)}
                    checked={selectedLanguage.some(
                      (lang) => lang.id === item.id,
                    )}
                  />
                  <label htmlFor={item.id}>{item.label}</label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default App;
