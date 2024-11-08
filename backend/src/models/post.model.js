"use strict";
/* <----------------------- MODULOS --------------------------> */
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        title: { type: String, required: true},
        description: { type: String, required: true},
        media: [ { type: String }],
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
        // tags: [ { type: mongoose.Schema.Types.ObjectId, ref: "Tag"}],
        // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        shares: [{ type: mongoose.Schema.Types.ObjectId, ref: "User"}],
        visibility: { type: String, enum: ['public', 'private', 'followers'], default: 'public'},
    }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
