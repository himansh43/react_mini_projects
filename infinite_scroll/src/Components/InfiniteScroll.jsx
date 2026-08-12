import { useEffect, useState } from "react";
import Post from "./Post";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        `https://picsum.photos/v2/list?page=${pageNo}&limit=3`,
      );
      const data = await response.json();
      console.log("data is", data);
      setPosts((prev) => [...prev, ...data]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [pageNo]);

  return (
    <div className="flex flex-col">
      <h2 className="font-bold m-10 text-center">Infinite Scroll</h2>

      <div className="flex gap-5 flex-col">
        {posts.map((post) => (
          <Post
            post={post}
            key={post.id}
            setPageNo={setPageNo}
            isLoading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default InfiniteScroll;
