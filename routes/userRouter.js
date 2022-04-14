const express = require("express");
const { append } = require("express/lib/response");
const { JsonWebTokenError } = require("jsonwebtoken");
const router = express.Router();
const middleware = require("../middleware");
const jwt = require("jsonwebtoken");
const UserData = require("../models/usersModel");
const TotalData = require("../models/reserveModal")
const ReserveData = require("../models/reserveModal");
const req = require("express/lib/request");
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
    console.log(req.user)
    if (!exist) {
      return res.status(400).send("User not found");
    }
    res.json(exist);
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});

router.post("/reserveTrain", async (req,res) => {
  try {
    console.log(req.body)
    const {name,train_num} = req.body
    let trainData = new ReserveData({
      trainName: name,
      trainNum: train_num
    });
    await trainData.save();
    res.status(200).send("Reserved Successfully");
  } catch(err) {
    console.log(err);
    return res.status(500).send("Not reserved");
  }
})
router.get("/getdata", async (req, res) => {
  try {
    let data = await TotalData.find();
    return res.status(200).send(data)
  } catch (err) {
    console.log(err);
    return res.status(500).send("Server Error");
  }
});
router.delete("/deletedata/:_id", async (req, res) => {
  console.log(req.params)
  TotalData.findByIdAndRemove({ _id: req.params._id }, (err) => {
    if (!err) {
      res.status(200).send(
       "Reservation Deleted Successfully"
      );
    } else {
      res.status(500).send(
       "not deleted"
      );
    }
  });
});

const deleteTask = (req, res) => {
  TasksModel.findByIdAndRemove({ _id: req.params.id }, (err) => {
    if (!err) {
      res.status(200).send(
        successResponse({
          message: "Task Deleted Successfully!",
        })
      );
    } else {
      res.status(500).send(
        failResponse({
          message: err ? err.message : "Task Not Deleted!",
        })
      );
    }
  });
};
module.exports = router;
