const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    password: {
      type: String,
      required: true,
      min: 6,
      max: 12,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
