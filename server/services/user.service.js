const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

exports.createUser = async function (data) {
  console.log(data.phoneNumber);
  try {
    user = await User.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      profile: data.file,
    });

    // Save Note in the database
    return user;
  } catch (e) {
    console.log(e);
    return { message: "Email Already Exist" };
  }
};

exports.updateUser = async function (obj) {
  console.log("firstName" in obj);
  if (!obj.id) throw Error("User not found.");
  let userObj = {};
  if ("firstName" in obj) {
    if (!obj.firstName) throw Error("FirstName is required.");
    Object.assign(userObj, { firstName: obj.firstName });
  }
  if ("lastName" in obj) {
    if (!obj.lastName) throw Error("LastName is required.");
    Object.assign(userObj, { lastName: obj.lastName });
  }
  if ("email" in obj) {
    if (!obj.email) throw Error("Email is required.");
    Object.assign(userObj, { email: obj.email });
  }
  if ("phoneNumber" in obj) {
    if (!obj.phoneNumber) throw Error("Phone number  is required.");
    Object.assign(userObj, { phoneNumber: obj.phoneNumber });
  }
  if ("profile" in obj) {
    if (!obj.profile) throw Error("Profile is required.");
    Object.assign(userObj, { profile: obj.profile });
  }

  try {
    await User.updateOne(
      {
        _id: obj.id,
      },
      {
        $set: userObj,
      }
    ).exec();

    return await User.findById(obj.id);
  } catch (error) {
    console.log(error);
  }
};


exports.getUserById = async function (obj) {
    if (!obj.id) return { message: "User Not Exist" };
    try {
        return await User.findById(obj.id);
    } catch (e) {
      console.log(e);
      return { message: "User Not Exist" };
    }
};

exports.getUsers = async function () {
    try {
        return await User.find();
    } catch (e) {
      console.log(e);
      return { message: "User Not Exist" };
    }
};

exports.deleteUser = async function (obj) {
    try {
        let user;
        if (!obj.id) throw Error("Id is required.");
        user = await User.findById({ _id: obj.id });
        if (user) {
            fs.unlinkSync(process.env.FILE_UPLOAD_PATH + "/" + user.profile)    
          let response = await User.remove({ _id: user._id });
          if (!response) throw Error("somting went worng cant not remove");
          else return "User Remove successfully";
        } else {
          throw Error("User Not Found with this id");
        }
      } catch (error) {
        throw Error(error);
      }
};



