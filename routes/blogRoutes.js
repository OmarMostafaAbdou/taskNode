const BlogController = require("../controllers/blogControllers");
const express = require("express");
const { stat } = require("fs");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { title } = require("process");
const jwt = require("jsonwebtoken");
let date = new Date();
console.log(date);
const Storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "..", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const Uploadeimage = multer({ storage: Storage });
router.post("/make-blog", Uploadeimage.single("file"), authrize, (req, res) => {
  let imageurl = new Date() + req.file.filename;
  const { title, body, author, tags, userid } = req.body;
  jwt.verify(req.token, "privateKey", (err, authData) => {
    console.log(authData);
    if (err) {
      res.sendStatus(404);
    } else {
      let data = BlogController.createblogs(
        title,
        body,
        imageurl,
        author,
        tags,
        userid
      );
      res.send("saved success");
    }
  });
});
router.get("/search/:search", async (req, res) => {
  let data = await BlogController.search(req.params.search);
  try {
    if (data) {
      res.send(data);
    } else {
      res.send("search not found");
    }
  } catch {
    throw error;
  }
});

router.get("/:page", async (req, res) => {
  let data = await BlogController.pagination(req.params.page);
  console.log(data);
  try {
    if (data) {
      res.send(data);
    } else {
      res.send("pagination not found");
    }
  } catch {
    throw error;
  }
});

router.delete("/delete-blog/:id/:userid", authrize, async (req, res) => {
  try {
    jwt.verify(req.token, "privateKey", (err, authData) => {
      let data = BlogController.deleteBLogs(req.params.userid, req.params.id);
      res.send("deleted blog success");
    });
  } catch (e) {
    console.log(e);
  }
});
router.use((req, res) => {
  res.status(404).send("Not Found");
});
function authrize(req, res, next) {
  const authrizekey = req.headers["authorization"];
  console.log(authrizekey);
  if (authrizekey !== undefined) {
    const auth = authrizekey.split(" ");
    const Token = auth[1];
    req.token = Token;
    next();
  } else {
    res.sendStatus(401);
  }
}
module.exports = router;
