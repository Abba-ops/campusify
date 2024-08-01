import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    otherNames: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePictureURL: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVendor: {
      type: Boolean,
      default: false,
    },
    accountCreationDate: {
      type: Date,
      default: Date.now,
    },
    userType: {
      type: String,
      enum: ["student", "staff"],
      required: true,
    },
  },
  { timestamps: true }
);

// Method to compare entered password with stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const notificationSchema = new Schema(
  {
    recipientId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    orderId: {
      type: String,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["new_order", "order_delivered", "new_product", "order_received"],
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "Vendor",
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export const Message = model("Message", messageSchema);
export const Notification = model("Notification", notificationSchema);
export const Task = model("Task", taskSchema);

export default User;
