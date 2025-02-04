const jwt = require("jsonwebtoken");
const APIError = require("../utils/errors");
const User = require("../app/users/model");

const createToken = (user, res) => {
  console.log(user);

  const payload = {
    sub: user._id,
    name: user.name,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    algorithm: "HS512",
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return res.status(201).json({
    success: true,
    token,
    message: "Successful",
  });
};

const tokenCheck = async (req, res, next) => {
  try {
    const isHeaderToken =
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ");
    if (!isHeaderToken) {
      return next(new APIError("Invalid session, please log in", 401));
    }

    const token = req.headers.authorization.split(" ")[1];
    console.log("User Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const userData = await User.findById(decoded.sub).select(
      "_id name lastname email"
    );

    console.log("User Information:", userData);

    if (!userData) {
      return next(new APIError("Invalid token - no user", 401));
    }

    req.User = userData;
    next();
  } catch (error) {
    return next(new APIError("Invalid Token", 401));
  }
};

const createTemporaryToken = async (userId, email) => {
  const payload = {
    sub: userId,
    email,
  };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.JWT_TEMPORARY_KEY,
      {
        algorithm: "HS512",
        expiresIn: process.env.JWT_TEMPORARY_EXPIRES_IN,
      },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve("Bearer " + token);
        }
      }
    );
  });
};

const decodedTemporaryToken = async (temporaryToken) => {
  try {
    const token = temporaryToken.split(" ")[1];
    if (!token) {
      throw new APIError("Token not found", 401);
    }

    const decoded = await new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_TEMPORARY_KEY, (err, decoded) => {
        if (err) {
          return reject(new APIError("Invalid token", 401));
        }
        resolve(decoded);
      });
    });

    const userData = await User.findById(decoded.sub).select(
      "_id name lastname email"
    );

    if (!userData) {
      throw new APIError("Invalid token", 401);
    }

    return userData;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createToken,
  tokenCheck,
  createTemporaryToken,
  decodedTemporaryToken,
};
