"use strict";
/* <----------------------- MODULOS --------------------------> */
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["usuario", "administrador"],
      default: "usuario",
    },
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
