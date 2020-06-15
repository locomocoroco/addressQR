const jwt = require("jsonwebtoken");
const userDb = require("../model/users");

const SECRETKEY = process.env.SECRETKEY;

const jwtauth = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    console.log(token)
    if (!token) return res.sendStatus(403);
    const { _id } = jwt.verify(token, SECRETKEY);
    const user = await userDb.findById(_id);
    if (!user) return res.sendStatus(401);
    delete user.passwordHash;
    req.user = user;
    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = jwtauth;
