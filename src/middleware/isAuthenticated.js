import User from "../models/user.models";
import jwt from "jsonwebtoken";
const isAuthenticated = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "No token provided login first",
    });
  }

  const verified = jwt.verify(token, process.env.JWT_SECRET);
  let user = User.findById(verified._id);
  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Invalid token",
    });
  }
  req.user = user;
  next();
};

export default isAuthenticated;
