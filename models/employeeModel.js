import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        phone: String,
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Organization'
        }
    },
    { timestamps: true }
);

employeeSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'organization',
        select: '_id name location'
    });
    next();
});

export default mongoose.model('Employee', employeeSchema);