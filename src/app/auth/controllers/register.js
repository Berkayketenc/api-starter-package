const User = require("../../users/model");
const bcrypt = require("bcrypt");
const APIError = require("../../../utils/errors");
const Response = require("../../../utils/response");

const register = (req, res, next) => {
  const { email, password, name, lastname } = req.body;

  if (!email || !password || !name || !lastname) {
    return next(new APIError("Please fill in all fields!", 400));
  }

  User.findOne({ email })
    .then((userMailCheck) => {
      if (userMailCheck) {
        throw new APIError("This email is already registered!", 401);
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const newUser = new User({
        email,
        password: hashedPassword,
        name,
        lastname,
      });
      return newUser.save();
    })
    .then((data) =>
      new Response(data, "Record added successfully").created(res)
    )
    .catch((error) => next(error));
};

module.exports = register;
