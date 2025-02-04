const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    resetPassword: {
      code: {
        type: String,
        default: null,
      },
      time: {
        type: String,
        default: null,
      },
    },
    loginCode: {
      code: {
        type: String,
        default: null,
        expiresAt: {
          type: Date,
          default: null,
        },
      },
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
