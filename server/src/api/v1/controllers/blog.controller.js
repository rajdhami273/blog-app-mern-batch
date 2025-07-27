const Blog = require("../models/Blog.model");

async function getAllBlogs(req, res) {
  try {
    const blogs = await Blog.find().populate("author", "_id name email");
    res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function getBlogById(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", "_id name email");
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function createBlog(req, res) {
  try {
    const { title, description, coverImageUrl } = req.body;
    const blog = await Blog.create({
      title,
      description,
      coverImageUrl,
      author: req.user._id,
    });
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function updateBlogById(req, res) {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const blog = await Blog.findByIdAndUpdate(
      id,
      { title, content, author },
      { new: true }
    );
    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

async function deleteBlogById(req, res) {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }
    res.status(200).json({
      message: "Blog deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
}

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
};
