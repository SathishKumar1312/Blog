import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { postStore } from '../store/postStore';

const DeletePost = () => {
  const { postDelete, setPostDelete, setCreate, setUpdate, setDeleteState, postUpdate, setPostUpdate } = postStore();
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postDelete._id}`);
      toast.success('Post deleted successfully!');
      setShowModal(false);
      if(postUpdate && postDelete._id === postUpdate._id){
        setPostUpdate(null);
      }
      setPostDelete(null); // Clear the selected post after deletion
    } catch (error) {
      toast.error('An error occurred while deleting the post.');
      console.error(error);
    }
  };

  useEffect(()=>{
    if(postDelete){
        setCreate(false);
        setUpdate(false);
        setDeleteState(true);
    }
  },[postDelete, setCreate, setUpdate, setDeleteState])

  return (
    <div className="container mt-5 mb-5">
      <h2 className="text-center text-danger">Delete Post</h2>
      <div className="row gx-0">
        <div className="col-12 col-md-8 mt-4 mx-auto">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{postDelete ? postDelete.title : 'Select from a blog post to delete'}</h5>
              {postDelete && <>
              <p className="card-text">Are you sure you want to delete this post?</p>
              <button className="btn btn-secondary me-4" onClick={() => setPostDelete(null)} disabled={!postDelete}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => setShowModal(true)} disabled={!postDelete}>
                Delete
              </button>
              </>}
            </div>
          </div>
        </div>
      </div>

      {postDelete && (
        <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you absolutely sure you want to delete this post? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeletePost;
