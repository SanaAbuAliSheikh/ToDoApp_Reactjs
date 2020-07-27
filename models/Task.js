const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  Tasks: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      status: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = Task = mongoose.model("task", TaskSchema);
