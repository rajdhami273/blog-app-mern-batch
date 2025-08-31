const router = require("express").Router();
const authMiddleware = require("../../../middlewares/auth.middleware");
const upload = require("../../../middlewares/upload.middleware");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlogById,
  deleteBlogById,
} = require("../controllers/blog.controller");

router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

router.post("/", authMiddleware, upload.single('coverImage'), createBlog);

router.patch("/:id", authMiddleware, upload.single('coverImage'), updateBlogById);

router.delete("/:id", authMiddleware, deleteBlogById);

module.exports = router;
