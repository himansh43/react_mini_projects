import { useEffect, useState } from "react";
import Pagination from "./Pagination";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=5`,
      );
      const data = await response.json();
      console.log("data is", data);
      setPosts(data);
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [pageNo]);
  return (
    <div>
      <h2 className="text-center font-bold text-2xl mt-5">Posts</h2>
      <div className="flex justify-center items-center mt-5">
        <div className="flex gap-3 relative">
          {isLoading &&
            Array(5)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="w-60 h-60 rounded-xl shimmer" />
              ))}
          {posts.map((item) => (
            <img
              src={item.download_url}
              alt="post-image"
              className="w-60 h-60 object-cover rounded-xl"
            />
          ))}
        </div>
      </div>
      {!isLoading && <Pagination pageNo={pageNo} setPageNo={setPageNo} />}
    </div>
  );
};

export default Posts;
