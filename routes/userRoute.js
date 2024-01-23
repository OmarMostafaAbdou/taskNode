const UserController = require("../controllers/UserController");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
  try {
    let { username, email, password, phone } = req.body;
    console.log(req.body);
    bcrypt.hash(password, 7, async (err, hash) => {
      let data = await UserController.Register(username, email, hash, phone);
      if (data != 0) {
        res.send(data);
      } else {
        res.send("reg again");
      }
    });
  } catch {
    res.status(500).send("reg error");
  }

  res.send("ok");
});
router.post("/login", async (req, res) => {
  try {
    let { Email, password } = req.body;
    console.log("body:", req.body);
    const login = await UserController.login(Email);
    console.log(login);
    console.log(password);

    bcrypt.compare(password, login.password, function (err, result) {
      if (result) {
        const token = jwt.sign(
          JSON.stringify(login),
          "privateKey",
          (err, token) => {
            res.json({ token });
          }
        );
      } else {
        res.sendStatus(404);
      }
    });
  } catch {
    res.send("invalid login");
  }
});

router.get("/get-users", authrize, async (req, res) => {
  try {
    let data = await UserController.getAllUsers();
    let userData;
    jwt.verify(req.token, "privateKey", (err, authData) => {
      console.log(authData);
      if (err) {
        res.sendStatus(404);
      } else {
        userData = res.json({
          users: data,
          status: 250,
          msg: "hi users",
        });
      }
    });
  } catch {
    res.send("error");
  }
});

router.delete("/delete-user", authrize, async (req, res) => {
  try {
    jwt.verify(req.token, "privateKey", async (err, authData) => {
      if (err) {
        res.sendStatus(404);
      } else {
        let { id } = req.body;
        let data = await UserController.deleteUser(id);
        res.send("ok");
      }
    });
  } catch {
    console.log("error");
  }
});
router.patch("/update-user/:id/:username", authrize, async (req, res) => {
  console.log(req.params.id);
  jwt.verify(req.token, "privateKey", async (err, authData) => {
    if (err) {
      res.sendStatus(404);
    } else {
      try {
        let data = await UserController.updateuser({
          _id: req.params.id,
          username: req.params.username,
        });
        res.json(data);
      } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user");
      }
    }
  });
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
