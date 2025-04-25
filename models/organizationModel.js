import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
    {
        name: { type: String },
        location: {
            latitude: Number,
            longitude: Number
        },
    },
    { timestamps: true }
);

export default mongoose.model('Oraanization', organizationSchema);

// 💡 Note: GeoJSON expects [longitude, latitude], not [latitude, longitude]. Easy to mix up.