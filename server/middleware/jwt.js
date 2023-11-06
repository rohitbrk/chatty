import jwt from "jsonwebtoken";

const createToken = (name, room) => {
  const token = jwt.sign({ name, room }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

const verifyJWT = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

export { createToken, verifyJWT };
