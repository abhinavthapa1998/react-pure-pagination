import "./styles.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
export default function App() {
  // States
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  // Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const fetchPosts = async () => {
    setLoading(true);
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    setPosts(res.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}
