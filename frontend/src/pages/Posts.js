import Post from "../components/Post";
import { useEffect, useState } from "react";
import axios from "axios";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:8000/api/posts/");
    setPosts(response.data);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <main>
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="mb-4" style={{color: "#219ebc"}}>Latest Posts</h1>
            {posts.length > 0 ? (
              posts.map((post) => <Post post={post} value={290} />)
            ) : (
              <h4>No posts available</h4>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Posts;
