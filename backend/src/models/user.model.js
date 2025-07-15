"use strict";
/* <----------------------- MODULOS --------------------------> */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    lastName: { type: String, required: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    role: {
      type: String,
      enum: ["usuario", "administrador"],
      default: "usuario",
    },
    permissions: {
      canPost: { type: Boolean, default: true},
      canComment: { type: Boolean, default: true}
    },
    profilePicture: { type: String, default: null},
    bio: { type: String, default: null},

    /*<---------- Relaciones con otros modelos ----------> */
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],

  },
  { timestamps: true, versionKey: false }
);
/* Método estatico disponible directamente en el modelo de usuario */
userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

/* Método estatico disponible directamente en el modelo de usuario */
userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
