const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth.middleware");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blog.controller");

router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

router.post("/", authMiddleware, createBlog);

router.patch("/:id", authMiddleware, updateBlogById);

router.delete("/:id", authMiddleware, deleteBlogById);

module.exports = router;
