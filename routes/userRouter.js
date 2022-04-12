const express = require("express");
const { append } = require("express/lib/response");
const { JsonWebTokenError } = require("jsonwebtoken");
const router = express.Router();
const middleware = require("../middleware");
const jwt = require("jsonwebtoken");
const UserData = require("../models/usersModel");
router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password, conformPassword } = req.body;
    console.log(req.body);
    // let exist = await UserData.findOne({ email });
    // if (exist) {
    //   return res.status(400).send("user already exist");
    // }
    if (password !== conformPassword) {
        console.log("not ok")
      return res.status(401).send("password are not matching");
    }
    if (password === conformPassword) {
        console.log("ok")
      let newUser = new UserData({
        username,
        email,
        password,
        conformPassword,
      });
      await newUser.save();
      res.status(200).send("Register Successfully");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("internal server error");
  }
});
router.post("/login", async (req, res) => {
  try {
      console.log(req.body)
    const { email, password } = req.body;
    let exist = await UserData.findOne({ email });
    console.log(exist)
    if (!exist) {
      return res.status(400).send("User not found");
    }
    if (exist.password !== password) {
      return res.status(400).send("Invalid credentials");
    }
    let payload = {
      user: {
        id: exist.id,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600000 }, (err, token) => {
      if (err) throw err;
      return res.json({ token });
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

router.get("/myprofile", middleware, async (req, res) => {
  try {
    let exist = await UserData.findById(req.user.id);
    if (!exist) {
      return res.status(400).send("User not found");
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
