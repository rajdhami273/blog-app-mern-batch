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
    const { title, description } = req.body;

    // Handle cover image
    let coverImageUrl = req.body.coverImageUrl; // fallback to URL if provided
    console.log(req.file);
    if (req.file) {
      // Generate URL for uploaded file
      coverImageUrl = `/uploads/${req.file.filename}`;
    }

    if (!coverImageUrl) {
      return res.status(400).json({
        message: "Cover image is required",
      });
    }

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
    const { title, description } = req.body;
    const user = req.user;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    if (!blog.author.equals(user._id)) {
      return res.status(403).json({
        message: "You are not authorized to update this blog",
      });
    }

    // Handle cover image update
    let coverImageUrl = blog.coverImageUrl; // keep existing by default
    if (req.file) {
      // New file uploaded
      coverImageUrl = `/uploads/${req.file.filename}`;
    } else if (req.body.coverImageUrl) {
      // URL provided in body
      coverImageUrl = req.body.coverImageUrl;
    }

    blog.title = title;
    blog.description = description;
    blog.coverImageUrl = coverImageUrl;

    await blog.save();
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
    const user = req.user;
    const blog = await Blog.findById(id);
    if (!blog.author.equals(user._id)) {
      return res.status(403).json({
        message: "You are not authorized to delete this blog",
      });
    }
    await Blog.findByIdAndDelete(id);
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
