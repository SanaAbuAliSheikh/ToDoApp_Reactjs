const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

// @route  GET api/user/tasks
// @desc   Get all task of a user
// @access Private
router.get("/tasks", auth, async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.user.id,
    });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "There's no task for this user" }] });
    }
    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route  PUT api/user/task
// @desc   Add task in user
// @access Private
router.put(
  "/tasks",
  [auth, [check("title", "Title is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }
    const { title, description } = req.body;

    const newTask = {
      title,
      description,
    };
    try {
      const user = await User.findOne({ _id: req.user.id });
      user.tasks.unshift(newTask);
      await user.save();
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).status("Server Error");
    }
  }
);

// @route  PUT api/user/tasks/status
// @desc   Set task as done
// @access Private
router.put("/tasks/status/:task_id", auth, async (req, res) => {
  try {
    const { task_id } = req.body;
    console.log(task_id);
    let user = await User.findOne({ "tasks.$._id": task_id });
    console.log(user);
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User doesn't exist" }] });
    }
    //Update
    user = await User.updateOne(
      { "tasks._id": task_id },
      { $set: { "tasks.status": !user.tasks.status } }
    );
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).status("Server Error");
  }
});

// @route  DELETE api/user/task/:task_id
// @desc   Delete task
// @access Private
router.delete("/tasks/:task_id", auth, async (req, res) => {
  try {
    // remove task
    const user = await User.findOne({ _id: req.user.id });
    // Get remove Index
    const removeIndex = await user.tasks
      .map((item) => item.id)
      .indexOf(req.params.task_id);
    if (removeIndex == -1) {
      return res.status(400).json({ errors: [{ msg: "Invalid Task" }] });
    }
    user.tasks.splice(removeIndex, 1);
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).status("Server Error");
  }
});

module.exports = router;
