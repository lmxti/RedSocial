"use strict";
/* <----------------------- MODELOS --------------------------> */
const User = require("../models/user.model.js");

async function createDefaultUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;
    await Promise.all([
      new User({
        name: "John Doe",
        username: "JDoe",
        password: await User.encryptPassword("JDoe123"),
        role: "usuario",
      }).save(),
      new User({
        name: "Jane Doe",
        username: "JaneDoe",
        password: await User.encryptPassword("JDoe123"),
        role: "administrador",
      }).save(),
    ]);
    console.log(
      "⚙️ [SETUP] initial.setup -> createDefaultUsers: Usuario default creados"
    );
  } catch (error) {
    console.log("error: initial.setup -> createDefaultUsers: ", error);
  }
}

module.exports = {
  createDefaultUsers,
};
