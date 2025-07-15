"use strict";
/* <----------------------- MODULOS --------------------------> */
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  description: { type: String, required: true },
  media: [{ type: String }],
  visibility: {
    type: String,
    enum: ["public", "private", "followers"],
    default: "public",
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
