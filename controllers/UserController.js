const { register } = require("module");
const user = require("../models/usermodels");
const { error } = require("console");

const Register = async (_username, _Email, _Password, _phone) => {
  try {
    console.log(_username);
    let data = await user.create({
      username: _username,
      Email: _Email,
      password: _Password,
      phone: _phone,
    });
    if (data) {
      console.log("user was registered successfully");
    } else {
      console.log("try again");
    }
  } catch {
    console.log("error");
  }
};

const login = async (email) => {
  let data = await user.findOne({
    Email: email,
  });
  console.log(data);

  return data;
};

const getAllUsers = async () => {
  let data = await user.find();
  if (data.length != 0) {
    return data;
  } else {
    return "error";
  }
};
const deleteUser = async (_uid) => {
  let data = await user.deleteOne({
    _id: _uid,
  });
};

let updateuser = async (_id, _username) => {
  try {
    let data = await updateOne({ _id: id }, { username: _username });
    console.log(data);
    return data;
  } catch {
    throw error;
  }
};

follow = async (follower, userid) => {
  await user.findByIdAndUpdate(follower, {
    $push: { followers: userid },
  });
  await user.findByIdAndUpdate(userid, {
    $push: { following: follower },
  });
};
unfollow = async (follower, userid) => {
  await user.findByIdAndUpdate(follower, {
    $pull: { followers: userid },
  });
  await user.findByIdAndUpdate(userid, {
    $pull: { following: follower },
  });
};

module.exports = { Register, login, getAllUsers, deleteUser, updateuser };
