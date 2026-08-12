import { useEffect } from "react";
import "../App.css";

const Post = ({ post, setPageNo, isLoading }) => {
  useEffect(() => {
    const lastChild = document.querySelector(".postImage:last-child");
    console.log("lastChild is", lastChild);
    if (!lastChild) return;
    const observer = new IntersectionObserver(
      (params) => {
        console.log("params are", params);
        if (params[0].isIntersecting) {
          observer.unobserve(lastChild);
          setPageNo((prev) => prev + 1);
        }
      },
      { threshold: "0.5" },
    );

    observer.observe(lastChild);

    return () => {
      if (lastChild) {
        observer.unobserve(lastChild);
      }
      observer.disconnect();
    };
  }, [post]);
  return (
    <div className="postImage">
      {isLoading && (
        <div className="absolute inset-0 animate-pulse bg-gray-300 rounded-xl" />
      )}

      <img
        src={post.download_url}
        alt="post-image"
        className={`w-80 h-64 object-cover rounded-xl shimmer`}
      />
    </div>
  );
};

export default Post;
