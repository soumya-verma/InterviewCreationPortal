const express = require("express");
const router = express.Router();
const config = require("config");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const User = require("../models/User");

// router.get("/");
router.post(
  "/",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    // check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email: email, password: password });

      // check if user exists or not
      if (!user) {
        return res.json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
          name: user.name,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
