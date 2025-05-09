import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    checkInLocation: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: [Number],
    },
    checkInTime: {
      type: Date,
    },
    checkOutLocation: {
      type: { type: String, enum: ["Point"] },
      coordinates: { type: [Number] },
    },
    checkOutTime: {
      type: Date,
    },
    workDuration: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Attendance", attendanceSchema);
