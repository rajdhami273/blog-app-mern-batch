const { verifyToken } = require("../utils/jwt");
const User = require("../api/v1/models/User.model");

module.exports = async (req, res, next) => {
  console.log(req.headers);
  if (!req.headers.authorization) {
    res.status(401).send({
      message: "Unauthorized",
    });
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).send({
      message: "Unauthorized",
    });
    return;
  }
  const user = await User.findById(decoded.userId);
  if (!user || !user.isActive) {
    res.status(401).send({
      message: "Unauthorized",
    });
    return;
  }
  req.user = user;
  next();
};
