import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { postStore } from "../store/postStore";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [selectedImg, setSelectedImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [existCategory, setExistCategory] = useState(false);
  const [categoryName, setCategoryName] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const {setCreate, setUpdate} = postStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      console.log(base64Image);
      setImagePreview(base64Image)
    };
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    setSelectedImg("");
  };

  async function handleCreate(e) {
    e.preventDefault();
    if (!title || !content || !category || !author) {
      toast.error("Please fill all fields");
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/posts/", {
        title,
        content,
        category,
        author,
        image: selectedImg,
      });
      console.log(await response.data);
      setCreate(false);
      setIsLoading(false);
      setTitle('');
      setContent('');
      setCategory('');
      setAuthor('');
      setSelectedImg('');
      setImagePreview(null);
      toast.success("Post created successfully");
    } catch (e) {
      console.log(e);
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

  useEffect(() => {
    getCategories();
  }, [setUpdate]);

  return (
    <div>
      <h3 className="text-center text-success mt-3">Create Post</h3>
      <form className="form-group w-100 mb-3">
        <div className="container">
          <div className="row gx-0 w-100">
            <div className="col-12 col-md-8 mt-2 mx-auto">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                      onClick={() => setCategory(name)}
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
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter the category"
                className="form-control"
                required
              />
            </div>

            <div className="col-12 col-md-8 mt-2 mx-auto">
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter the author"
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
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter the content"
                className="form-control"
              />
            </div>

            <div className="col-12 col-md-5 mt-2 mx-auto">
              <button
                disabled={isLoading}
                onClick={(e) => handleCreate(e)}
                className="btn btn-primary w-100"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
