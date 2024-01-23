const { log } = require("console");
const blogs = require("../models/blogemodels");
const { serialize } = require("v8");
createblogs = async (_title, _body, _photo, _author, _tags, _userid) => {
  try {
    let data = await blogs.create({
      title: _title,
      body: _body,
      photo: _photo,
      author: _author,
      tags: _tags,
      userid: _userid,
    });
    if (data) {
      console.log("added");
    } else {
      console.log("error");
    }
  } catch (e) {
    console.log(e);
  }
};

desplay = async () => {
  try {
    let data = await blogs.find();
    if (data) {
      return data;
    } else {
      return "error";
    }
  } catch (e) {
    console.log(e);
  }
};

deleteBLogs = async (user_id, blogid) => {
  try {
    let data = await blogs.deleteOne({ userid: user_id, _id: blogid });
  } catch {
    console.log("error");
  }
};
editblogs = async (blog_id, _title) => {
  try {
    let data = await blogs.updateOne({ _id: blog_id }, { title: _title });
    return data;
  } catch (e) {
    console.log(e);
  }
};

search = async (search) => {
  try {
    let data = await blogs.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ],
    });

    return data;
  } catch {
    throw error;
  }
};
pagination = async (p) => {
  const page = p;
  const limit = 2;
  const skip = (page - 1) * limit;

  let data = await blogs.find().skip(skip).limit(limit);
  return data;
};

module.exports = {
  createblogs,
  desplay,
  deleteBLogs,
  editblogs,
  search,
  pagination,
};
