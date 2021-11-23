const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const auth = require("../middleware/auth");
const Interview = require("../models/Interview");
const { check, validationResult } = require("express-validator");

async function isPossible(
  start,
  end,
  date,
  interviewer,
  candidate,
  id = mongoose.Types.ObjectId("000000000000000000000000")
) {
  //  if date is past
  let q = new Date();
  let m = q.getMonth() + 1;
  let d = q.getDate();
  let y = q.getFullYear();

  let today = y + "-" + m + "-" + d;

  if (date < today) {
    console.log("Past date");
    return false;
  }

  // if current date and time is past
  let min = q.getMinutes();
  let hr = q.getHours();

  let now = hr + ":" + min;

  if (date == today && start < now) {
    console.log("Past Time");
    return false;
  }

  let arr = [];
  arr = await Interview.find();
  let s = parseInt(start.replace(/:/g, ""));
  let e = parseInt(end.replace(/:/g, ""));

  if (s >= e) return false;

  for (let i = 0; i < arr.length; i++) {
    // If the current person is involved in any other interview at that time

    if (id === arr[i].id) continue;
    if (arr[i].interviewer === interviewer || arr[i].candidate === candidate) {
      if (date === arr[i].date) {
        let s1 = parseInt(arr[i].start.replace(/:/g, ""));
        let e1 = parseInt(arr[i].end.replace(/:/g, ""));

        if (s <= s1 <= e || s <= e1 <= e || s1 <= s <= e1 || s1 <= e <= e1) {
          if (s1 == e || e1 == s) {
            continue;
          }
          return false;
        }
      }
    }
  }
  return true;
}

router.get("/", auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/",
  [
    auth,
    [
      check("interviewer", "Interviewer is required").not().isEmpty(),
      check("candidate", "Candidate is required").not().isEmpty(),
      check("date", "Date is required").not().isEmpty(),
      check("start", "Start Time is required").not().isEmpty(),
      check("end", "End Time is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { interviewer, candidate, date, start, end } = req.body;

    let check = await isPossible(start, end, date, interviewer, candidate);

    // console.log(check);

    if (check) {
      const interview = new Interview({
        interviewer: interviewer,
        candidate: candidate,
        date: date,
        start: start,
        end: end,
      });

      await interview.save();
      res.json({ errors: [{ msg: "New Interview scheduled!" }] });
    } else {
      return res.status(400).json({
        errors: [
          { msg: "It is not possible to schedule the interview in this slot." },
        ],
      });
    }
  }
);

router.delete("/:id", auth, async (req, res) => {
  try {
    await Interview.findOneAndRemove({ id: req.params.id });
    res.json({ msg: "Interview deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.post(
  "/update/:id",
  [
    auth,
    [
      check("date", "Date is required").not().isEmpty(),
      check("start", "Start Time is required").not().isEmpty(),
      check("end", "End Time is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // check errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { date, start, end } = req.body;
    const interview = await Interview.findById(req.params.id);

    let check = await isPossible(
      start,
      end,
      date,
      interview.interviewer,
      interview.candidate,
      req.params.id
    );

    // console.log("hello");
    // console.log(check);
    // console.log("bye");
    if (check) {
      const update = {
        start: start,
        end: end,
      };
      await Interview.findOneAndUpdate(
        { id: req.params.id },
        { $set: update },
        { new: true }
      );
      res.json({ errors: [{ msg: "Interview updated!" }] });
    } else {
      return res.status(400).json({
        errors: [
          { msg: "It is not possible to schedule the interview in this slot." },
        ],
      });
    }
  }
);

router.get("/list", auth, async (req, res) => {
  try {
    const interviews = await Interview.find();
    res.json(interviews);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
