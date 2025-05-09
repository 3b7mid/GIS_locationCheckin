import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: [Number], // [longitude, latitude] Note: GeoJSON expects [longitude, latitude], not [latitude, longitude]
    },
  },
  { timestamps: true }
);

organizationSchema.index({ location: "2dsphere" });

export default mongoose.model("Organization", organizationSchema);
