import Task from "../models/taskModel.js";
import { asyncHandler } from "../utilities/index.js";

/**
 * @desc    Create a new task
 * @route   POST /api/tasks
 * @access  Private (requires authentication)
 */
export const createTask = asyncHandler(async (req, res) => {
  const { task, role } = req.body;

  if (!task || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newTask = new Task({
    task,
    role,
    userId: req.user._id,
  });

  const savedTask = await newTask.save();
  res.status(201).json({ success: true, data: savedTask });
});

/**
 * @desc    Update an existing task
 * @route   PUT /api/tasks/:taskId
 * @access  Private (requires authentication)
 */
export const updateTask = asyncHandler(async (req, res) => {
  const { taskId } = req.params;
  const { task, completed } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { task, completed, updatedAt: Date.now() },
    { new: true }
  );

  if (!updatedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.status(200).json({ success: true, data: updatedTask });
});
