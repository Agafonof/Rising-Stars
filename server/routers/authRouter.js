const express = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../db/models");
const isAuth = require("../middlewares/isAuth");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {

  const { name, password } = req.body;
  
  const hashpass = await bcrypt.hash(password, 3);

  const [foundUser, created] = await User.findOrCreate({
    where: { name },
    defaults: {
      hashpass,
    },
  });

  if (!created) return res.status(401).json({ message: "Name is in use" });

  delete foundUser.hashPass
  req.session.user = foundUser;

  return res.json(foundUser);
});

authRouter.post("/login", async (req, res) => {
  const { name, password } = req.body;

  const foundUser = await User.findOne({ where: { name } });

  if (!foundUser) return res.status(400).json({ message: "No such name" });

  if (await bcrypt.compare(password, foundUser.hashpass)) {
    req.session.user = foundUser;
    return res.status(200).json(foundUser);
  }

  return res.status(401).json({ message: "Wrong password" });
});

authRouter.get("/logout", isAuth, (req, res) => {
  req.session.destroy();
  res.clearCookie("user_sid");
  res.sendStatus(200);
});

authRouter.get("/check", async (req, res) => {
  if (req.session?.user?.id) {
    return res.json(req.session.user);
  }
  return res.sendStatus(401);
});

module.exports = authRouter;
