import "./styles.css";
import { useState, useEffect } from "react";
const heightOfList = 120;
export default function App() {
  const URL = "https://jsonplaceholder.typicode.com/posts";
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (heightOfList * 10 < window.innerHeight) {
      setPage((prevPage) => prevPage + 1);
    }
    function handleScroll() {
      if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="">
      <ol>
        {data.slice(0, 10 * page).map((post) => {
          return <li style={{ height: heightOfList }}>{post.title}</li>;
        })}
      </ol>
    </div>
  );
}
