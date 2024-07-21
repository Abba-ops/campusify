import mongoose from "mongoose";

const { Schema, model } = mongoose;

const taskSchema = new Schema(
  {
    task: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "vendor"],
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = model("Task", taskSchema);

export default Task;
