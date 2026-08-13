import { useEffect, useRef, useState } from "react";

const AutoComplete = () => {
  const [queryData, setQueryData] = useState([]);
  const [query, setQuery] = useState("");

  const [status, setStatus] = useState({
    loading: "loading",
    success: "success",
    error: "error",
  });
  const [state, setState] = useState();
  const cache = useRef({});
  console.log(cache);
  useEffect(() => {
    if (!query.trim()) {
      setQueryData([]);
      return;
    }

    const abortController = new AbortController();
    const { signal } = abortController;
    const fetchData = async () => {
      setState(status.loading);
      try {
        if (cache.current[query]) {
          console.log("CACHE HIT:", query);
          setQueryData(cache.current[query]);
          setState(status.success);
          return;
        }
        console.log("fetch api called");
        const response = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          { signal },
        );
        const data = await response.json();
        setQueryData(data.products);
        cache.current[query] = data.products;
        setState(status.success);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }
      }
    };

    const timerId = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [query]);

  return (
    <div className="flex flex-col justify-center items-center m-10">
      <input
        type="text"
        placeholder="search here..."
        value={query}
        className="border-gray-500 border px-3 py-1 mb-3 w-96 rounded-sm outline-none"
        onChange={(e) => setQuery(e.target.value)}
      />
      {state === status.loading && <div>Loading...</div>}
      {state === status.success && (
        <div className="flex ">
          <ul className="px-5 py-5 flex flex-col gap-3 ">
            {queryData.map((item, index) => (
              <li
                key={item.id}
                className="w-96 bg-gray-200 px-3 py-1 rounded-sm"
              >
                {`${index + 1}) `}
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
