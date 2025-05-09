import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phone: String,
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true }
);

employeeSchema.pre(/^find/, function (next) {
  this.populate({
    path: "organization",
    select: "_id name location",
  });
  next();
});

export default mongoose.model("Employee", employeeSchema);
