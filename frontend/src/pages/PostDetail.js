import {useEffect, useState} from 'react';
import { Link, useParams} from 'react-router-dom';
import axios from 'axios';
import DOMPurify from 'dompurify';
import {postStore} from '../store/postStore';

export default function PostDetail() {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    const { setUpdate, setDeleteState, setPostUpdate, isAdmin, update, setPostDelete } = postStore();

    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/posts/${id}`)
            setPost(response.data);
        } catch (error) {
            console.error('Error fetching post:', error)
        }
    }
    useEffect(() => {
        fetchPost();
    }, [])
    console.log('PostDetail',update)

    if (!post) {
        return <p>Loading...</p>
    }
    const sanitizedContent = DOMPurify.sanitize(post.content);

    const formattedDate = Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: "numeric",
        year: "numeric"
    }).format(new Date(post.createdAt))

    return  <main className="container my-4 mx-auto">
    <div className="row d-flex flex-column justify-content-center align-items-center">
        <article className="col-lg-8">
            <h2 className="blog-post-title">{post.title}</h2>
            <p className="blog-post-meta">{formattedDate} by <Link className='text-decoration-none' target='_blank' to={'https://sathishkumarm.me/'}>{post.author}</Link></p>
            <img className="mb-3 img-fluid" src={post.image} alt="" />

            <div className="blog-post-content">
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
            </div>
        </article>
    </div>
    {isAdmin &&
        <div className='mt-5 d-flex flex-row justify-content-center align-items-center'>
            <button type='button' className='btn btn-primary me-5' onClick={() => {setUpdate(true); setPostUpdate(post)}} ><Link className='text-white text-decoration-none' to={'/admin'}>Update this post</Link></button>
            <button type='button' className='btn btn-danger ms-5' onClick={() => {setDeleteState(true); setPostDelete(post)}} ><Link className='text-white text-decoration-none' to={'/admin'}>Delete this post</Link></button>
        </div>
    }
</main>
}