import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const [allPost, setAllPosts] = useState([]);

  const [modalPost, setModalPost] = useState(null);
  const timerId = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newPost = {
      id: crypto.randomUUID(),
      file,
      url: URL.createObjectURL(file),
    };
    setAllPosts((prev) => [...prev, newPost]);
    console.log("file is", file);
    console.log("allPost are", allPost);
  };
  const handleClick = (post) => {
    console.log("post is", post);

    setModalPost(post);
  };

  useEffect(() => {
    if (!modalPost) return;
    timerId.current = setTimeout(() => {
      setModalPost(null);
    }, 3000);
    return () => {
      clearTimeout(timerId.current);
    };
  }, [modalPost]);



  return (
    <div
      className={`flex  mt-10 ml-10 ${modalPost ? "flex justify-center items-center" : ""}`}
    >
      {modalPost ? (
        <div className="flex justify-center gap-10">
          <div>
            <button
              onClick={() => setModalPost(null)}
              className="px-3 py-1 bg-gray-500 text-white"
            >
              Back
            </button>
          </div>
          <img src={modalPost.url} alt="modal-post" className="w-full h-96" />
        </div>
      ) : (
        <div>
          <h2 className="font-medium text-2xl">Instagram stories</h2>
          <div className="flex gap-3 justify-center items-center">
            <div className="rounded-full border-3 w-20 h-20 flex justify-center items-center mt-5">
              <label htmlFor="input" className="font-medium text-4xl ">
                +
                <input type="file" hidden id="input" onChange={handleChange} />
              </label>
            </div>

            {/* stories */}
            <div className="flex gap-3">
              {allPost.map((post, index) => (
                <div key={index}>
                  {
                    <div onClick={() => handleClick(post)}>
                      <img
                        src={post.url}
                        alt="post"
                        className="rounded-full border-3 border-red-500 p-1 w-20 h-20 flex justify-center items-center mt-5 object-cover"
                      />
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
