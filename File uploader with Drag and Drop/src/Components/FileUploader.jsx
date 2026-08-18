import { useState } from "react";

const FileUploader = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = (e) => {
    const allChoosenFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...allChoosenFiles]);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  const handleOnDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  const handleRemove = (name) => {
    const filteredData = files.filter((item) => {
      return item.name !== name;
    });
    setFiles(filteredData);
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-2xl m-10">React File Uploader</h2>
        <div
          className={` w-[600px] h-60  shadow-xl flex justify-center  items-center`}
        >
          <div
            className={`border-2 border-dashed ${!isDragging ? "border-gray-500" : "border-green-500"} rounded-sm text-center w-96 h-20 p-20 flex flex-col justify-center items-center gap-2`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragEnter}
            onDrop={handleOnDrop}
          >
            <h2 className="text-xl font-md">Drag and Drop</h2>
            <label
              htmlFor="browseFile"
              className="px-3 py-1 w-54 bg-green-400 rounded-md "
            >
              Browse Files here
            </label>
            <input
              type="file"
              multiple
              hidden
              id="browseFile"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-center    w-[600px] mt-5 ">
        {files?.map((item, index) => (
          <div
            key={index}
            className="flex  justify-between  bg-gray-300 px-3 py-3"
          >
            <img
              src={URL.createObjectURL(item)}
              alt="selected-file"
              className="w-18 h-18 object-cover"
            />
            <div className="flex justify-center items-center flex-col">
              <p>{item.name}</p>
              <p>{`${(item.size / 1024).toFixed(2)} kb`}</p>
            </div>
            <button onClick={() => handleRemove(item.name)}>❌</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploader;
