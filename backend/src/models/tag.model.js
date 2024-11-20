"use strict";
/* <----------------------- MODULOS --------------------------> */
const moongose = require("mongoose");

const tagSchema = new moongose.Schema({
  name: { type: String, required: true, unique: true, trim: true },
  followers: [{ type: moongose.Schema.Types.ObjectId, ref: "User" }],
  postsCount: { type: Number, default: 0}
});

const Tag = moongose.model("Tag", tagSchema);
module.exports = Tag;
