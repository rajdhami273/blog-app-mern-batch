const router = require("express").Router();

// routes
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const blogRoutes = require("./blog.routes");

// middleware
const authMiddleware = require("../../../middlewares/auth.middleware");

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);
router.use("/blogs", blogRoutes);

module.exports = router;
