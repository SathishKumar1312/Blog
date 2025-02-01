const Post = require("../models/Post");
const Category = require("../models/Category");
const cloudinary = require("../utils/cloudinary");

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const newPost = async (req, res) => {
  const { title, content, category, author } = req.body;
  const image = req.body.image || null;

  try {
    // Find category by slug
    let categories = await Category.findOne({ slug: category.toLowerCase() });

    // Create new category if it doesn't exist
    if (!categories) {
      const newCategory = new Category({
        name: category,
        slug: category.toLowerCase(),
      });
      await newCategory.save();
      categories = await Category.findOne({ slug: category.toLowerCase() });
    }

    const categoryID = categories._id;
    let imageURL = null;

    // Upload image if provided
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      if (!uploadResponse || !uploadResponse.secure_url) {
        throw new Error("Image upload failed");
      }
      imageURL = uploadResponse.secure_url;
    }

    // Create new post
    const newPost = new Post({
      title,
      content,
      category: categoryID,
      author,
      image: imageURL,
    });
    await newPost.save();

    return res.status(201).json(newPost);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
};

const updatePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;
    post.author = req.body.author || post.author;
    post.updatedAt = Date.now();

    const image = req.body.image || null;
    let imageURL = post.image; // Default to existing image URL

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      if (!uploadResponse || !uploadResponse.secure_url) {
        throw new Error("Image upload failed");
      }
      imageURL = uploadResponse.secure_url;
    }

    const category = req.body.category;
    let categories = await Category.findOne({ slug: category.toLowerCase() });

    if (!categories) {
      const newCategory = new Category({
        name: category,
        slug: category.toLowerCase(),
      });
      await newCategory.save();
      categories = await Category.findOne({ slug: category.toLowerCase() });
    }

    const categoryID = categories._id;
    post.category = categoryID;
    post.image = imageURL;

    await post.save();

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};


const deletePost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    await Post.findByIdAndDelete(id);
    res.status(200).json({ message: "deleted successfully!" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const getPostsByCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const post = await Post.find({ category: category }).populate("category");
    if (!post) {
      return res.status(404).json({ message: "No posts found" });
    }
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getPosts,
  getSinglePost,
  newPost,
  updatePost,
  deletePost,
  getPostsByCategory,
};
