import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { postStore } from "../store/postStore";

const UpdatePost = () => {
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [updateCategory, setUpdateCategory] = useState("");
  const [updateAuthor, setUpdateAuthor] = useState("");
  const [updateImg, setUpdateImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [existCategory, setExistCategory] = useState(false);
  const [categoryName, setCategoryName] = useState([]);
  const [category, setCategory] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const { setCreate, setDeleteState, setUpdate, postUpdate, postDelete, setPostDelete, setPostUpdate } = postStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const base64Image = reader.result;
      setUpdateImg(base64Image);
      setImagePreview(base64Image);
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setUpdateImg("");
  };

  async function handleUpdate(e) {
    e.preventDefault();
    if (!updateTitle || !updateContent || !updateCategory || !updateAuthor) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:8000/api/posts/${postUpdate._id}`,
        {
          title: updateTitle,
          content: updateContent,
          category: updateCategory,
          author: updateAuthor,
          image: updateImg,
        }
      );
      console.log(await response.data);
      if(postDelete && postDelete._id === postUpdate._id){
        setPostDelete(null);
      }
      setCreate(false);
      setIsLoading(false);
      setUpdateTitle("");
      setUpdateContent("");
      setUpdateCategory("");
      setUpdateAuthor("");
      setUpdateImg("");
      setImagePreview(null);
      setPostUpdate(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Post updated successfully");
    } catch (e) {
      toast.error("")
      console.log(e);
      setIsLoading(false);
    }
  }

  async function getCategories() {
    try {
      const response = await axios.get("http://localhost:8000/api/categories/");
      const categories = response.data;
      const categoriesList = categories.map((category) => category.name);
      setCategoryName(categoriesList);
    } catch (e) {
      console.log(e);
    }
  }

  async function getSingleCategory() {
    if (postUpdate && postUpdate.category) {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/categories/${postUpdate.category}`
        );
        const singleCategory = response.data;
        setCategory(singleCategory);
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    getCategories();
    getSingleCategory();
    if (postUpdate) {
      setUpdateTitle(postUpdate.title);
      setUpdateContent(postUpdate.content);
      setUpdateAuthor(postUpdate.author);
      setUpdateCategory(category?.name || "");
      setImagePreview(postUpdate.image);
      setUpdateImg(postUpdate.image);
      setCreate(false);
      setDeleteState(false);
      setUpdate(true);
    }
  }, [postUpdate, setCreate, setDeleteState, setUpdate, category.name]);

  return (
    <div>
      {postUpdate ? (
        <>
        <h3 className="text-center text-success mt-3">Update Post</h3>
          <form className="form-group w-100 mb-3">
            <div className="container">
              <div className="row gx-0 w-100">
                <div className="col-12 col-md-8 mt-2 mx-auto">
                  <input
                    type="text"
                    value={updateTitle}
                    onChange={(e) => setUpdateTitle(e.target.value)}
                    placeholder="Enter the title"
                    className="form-control"
                    required
                  />
                </div>

                {existCategory ? (
                  <>
                    <div className="col-12 col-md-8 mt-2 mx-auto">
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setExistCategory(!existCategory)}
                      >
                        Hide existing categories
                      </button>
                    </div>
                    <div className="col-12 col-md-8 mt-2 mx-auto">
                      {categoryName.map((name, i) => (
                        <button
                          type="button"
                          key={name}
                          className="d-inline-block btn btn-link text-decoration-none mt-1 text-black mx-auto"
                          onClick={() => setUpdateCategory(name)}
                        >
                          {i + 1}.{name}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="col-12 col-md-8 mt-2 mx-auto">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => setExistCategory(!existCategory)}
                    >
                      Show existing categories
                    </button>
                  </div>
                )}

                <div className="col-12 col-md-8 mt-2 mx-auto">
                  <input
                    type="text"
                    value={updateCategory}
                    onChange={(e) => setUpdateCategory(e.target.value)}
                    placeholder="Enter the updateCategory"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12 col-md-8 mt-2 mx-auto">
                  <input
                    type="text"
                    value={updateAuthor}
                    onChange={(e) => setUpdateAuthor(e.target.value)}
                    placeholder="Enter the updateAuthor"
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-12 col-md-8 mt-2 mx-auto">
                  <input
                    type="file"
                    id="avatar-upload"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    disabled={isLoading}
                  />
                </div>
                {imagePreview && (
                  <div className="p-4 d-flex justify-content-center w-100">
                    <div
                      className="mb-3 position-relative"
                      style={{
                        width: "auto",
                        maxWidth: "250px",
                        height: "auto",
                        maxHeight: "200px",
                      }}
                    >
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-100 h-100 rounded-lg border border-secondary"
                        style={{ objectFit: "cover" }}
                      />
                      <button
                        onClick={removeImage}
                        className="btn btn-danger btn-sm rounded-3 position-absolute top-0 end-0 translate-middle"
                        style={{ marginRight: "-20px", marginTop: "0px" }}
                        type="button"
                      >
                        X
                      </button>
                    </div>
                  </div>
                )}

                <div className="col-12 col-md-8 mt-2 mx-auto">
                  <textarea
                    rows={9}
                    value={updateContent}
                    onChange={(e) => setUpdateContent(e.target.value)}
                    placeholder="Enter the updateContent"
                    className="form-control"
                  />
                </div>

                <div className="col-12 col-md-5 mt-2 mx-auto">
                  <button
                    disabled={isLoading}
                    onClick={(e) => handleUpdate(e)}
                    className="btn btn-warning w-100"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </form>
        </>
      ) : (
        <>

          <h3 className="text-center text-primary mt-5 mb-5">Select from the blog post to update</h3>
        </>
      )}
    </div>
  );
};

export default UpdatePost;
