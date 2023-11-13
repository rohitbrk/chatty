import jwt from "jsonwebtoken";

const createToken = (name, room) => {
  try {
    const token = jwt.sign({ name, room }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return token;
  } catch (err) {
    return false;
  }
};

const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.status(400).json({ status: "error" });
  }
};

export { createToken, verifyJWT };
