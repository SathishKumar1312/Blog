import Post from "../components/Post";
import {useEffect, useState} from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

	// const axiosInstance = axios.create({
	// 	baseURL: "http://localhost:8000/api"
	//   });

    const fetchPosts = async () => {
        const response = await axios.get("http://localhost:8000/api/posts/")
        setPosts(response.data);
    }

	const fetchCategories = async () => {
        const response = await axios.get('http://localhost:8000/api/categories')
        setCategories(response.data);
    }


    useEffect(() => {
        fetchPosts();
		fetchCategories();
    }, [])

    return <>

	<main>
		<div className="container mt-4">
			<div className="row">
				<div className="col-lg-8">
					<h1 className="mb-4" style={{color: "#0077b6"}}>Latest Posts</h1>
                    {
                        posts.length > 0 ? posts.map((post) => <Post post={post} />) : <h4>No posts available</h4>
                    }
				</div>
				<div className="col-lg-4">
					<div className="card mb-4">
						<div className="card-body">
							<h5 className="card-title" style={{color: "#283618"}}>About Me</h5>
							<p className="card-text">
                        I'm <span style={{ color: '#6610f2' }}>Sathish Kumar</span>, a passionate Fullstack Developer specializing in 
                        <span style={{ color: '#007bff' }}> MERN stack</span> (MongoDB, Express JS, React JS, and Node.js). 
                        I thrive on building <span style={{ color: '#28a745' }}>full-stack applications</span> that deliver exceptional user experiences. 
                        With a strong academic background and a <span style={{ color: '#e83e8c' }}>Bachelor of Engineering in Computer Science</span> from 
                        <span style={{ color: '#fd7e14' }}> Anna University</span>, I've honed my skills in 
                        <span style={{ color: '#fd7e14' }}> JavaScript, React JS,</span> and <span style={{ color: '#fd7e14' }}>Node.js</span>. 
                        I’m <span style={{ color: '#20c997' }}>creative, precise,</span> and dedicated to transforming ideas into captivating web applications. 
                        My versatility allows me to excel in both backend development and crafting <span style={{ color: '#6610f2' }}>user-friendly interfaces</span>, 
                        always striving to stay ahead with <span style={{ color: '#007bff' }}>emerging technologies</span>.
                    </p>
						</div>
					</div>

					<div className="card mb-4">
						<div className="card-body">
							<h5 className="card-title mb-4">Categories</h5>
							{categories.map(category => <li className="list-group-item mt-2 "><Link to={`/posts/category/${category._id}`} className="text-success text-decoration-none">{category.name}</Link></li>)}
						</div>
					</div>
				</div>
			</div>
        </div>
	</main>

    </>
}