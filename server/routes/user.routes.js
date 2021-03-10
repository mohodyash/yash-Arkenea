"use strict";
const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");
const multer = require("multer");

const { v4: uuidv4 } = require("uuid");
const UserService = require("../services/user.service");
let File = uuidv4();
let path = require('path')
const fs = require("fs");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.FILE_UPLOAD_PATH);
  },
  filename: function (req, file, cb) {
    File = File + path.extname(file.originalname);
    cb(null, File);
  },
});
let upload = multer({ storage: storage });

// Without authentication
router.get("/getusers", UserController.getUsers);
router.post("/deleteuser", UserController.deleteUser);
router.post("/getuser", UserController.getUserById);

router.post(
  '/create',
  upload.single("profile"), 
   async (req, res) => {
     req.body.file = File;
   let user = await  UserController.createUser(req);
   console.log(user);
     res.json(user);
   }
);
router.post(
  '/update',
  upload.single("profile"), 
  async (req, res) => {
  req.body.file = File;
  let user = await  UserController.updateUser(req);
  console.log(user);
    res.json(user);
  }
);



module.exports = router;