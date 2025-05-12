import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import { sanitizeAttendance } from "../utils/sanitizeData.js";
import moment from "moment";
import Employee from "../models/employeeModel.js";
import Organization from '../models/organizationModel.js';
import Attendance from "../models/attendanceModel.js";

const calculateDurationTime = (checkinTime, checkoutTime) => {
  const diffInMilliseconds = checkoutTime - checkinTime;
  const durationInHours = diffInMilliseconds / (1000 * 60 * 60);

  return parseFloat(durationInHours.toFixed(2));
};

export const employeeCheckin = asyncHandler(async (req, res, next) => {
  const { employeeId, checkinLocation } = req.body;
  const [lng, lat] = checkinLocation.coordinates;

  const employee = await Employee.findById(employeeId).populate("organization");

  const orgLocation = employee.organization.location;

  const nearBy = await Organization.findOne({
    _id: employee.organization._id,
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        $maxDistance: 100
      }
    }
  });

  if (!nearBy) {
    return next(new ApiError(`Out of allowed range (100 meters).`, 400));
  }
  const checkinTime = new Date();

  const attendance = await Attendance.create({
    employee: employeeId,
    checkInLocation: {
      type: "Point",
      coordinates: [lng, lat],
    },
    checkInTime: checkinTime,
  });

  res.status(201).json({
    success: true,
    messaage: "Check-in successful",
    data: sanitizeAttendance(attendance),
  });
});

export const employeeCheckout = asyncHandler(async (req, res, next) => {
  const { employeeId, checkoutLocation } = req.body;
  const [lng, lat] = checkoutLocation.coordinates;
  const employee = await Employee.findById(employeeId).populate("organization");

  const isNearby = await Organization.findOne({
    _id: employee.organization._id,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat],
        },
        $maxDistance: 100,
      },
    },
  });

  if (!isNearby) {
    return next(new ApiError("Checkout location is out of allowed range (100 meters).", 400));
  }

  const attendance = await Attendance.findOne({
    employee: employeeId,
    checkOutTime: { $exists: false },
  });

  if (!attendance) {
    throw new ApiError("No active check-in found for this employee", 400);
  }

  const checkOutTime = new Date();
  const workDuration = calculateDurationTime(
    attendance.checkInTime,
    checkOutTime
  );

  attendance.checkOutTime = checkOutTime;
  attendance.workDuration = workDuration;
  attendance.checkOutLocation = {
    type: "Point",
    coordinates: [lng, lat],
  };

  await attendance.save();

  res.status(200).json({
    success: true,
    message: "Employee checkout successful",
    data: sanitizeAttendance(attendance),
  });
});

export const getEmployeeAttendance = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;

  const attendances = await Attendance.find({ employee: employeeId }).sort({ checkInTime: -1 });

  if (!attendances.length) {
    return next(
      new ApiError("No attendance records found for this employee", 404)
    );
  }

  res.status(200).json({
    success: true,
    results: attendances.length,
    data: attendances.map(sanitizeAttendance),
  });
});

export const getTodayAttendance = asyncHandler(async (req, res, next) => {
  const { employeeId } = req.params;
  const todayDateString = moment.utc().format("YYYY-MM-DD");
  const attendanceRecords = await Attendance.find({
    employee: employeeId,
    $expr: {
      $eq: [
        { $dateToString: { format: "%Y-%m-%d", date: "$checkInTime" } },
        todayDateString
      ]
    }
  }).populate({ path: "employee", select: "-createdAt -updatedAt -__v" });

  if (!attendanceRecords || attendanceRecords.length === 0) {
    return next(new ApiError("No attendance records found for today.", 404));
  }

  res.status(200).json({
    success: true,
    data: attendanceRecords.map(sanitizeAttendance),
  });
});

export const getAllAttendance = asyncHandler(async (req, res) => {
  const totalRecords = await Attendance.countDocuments();

  const records = await Attendance.find();

  res.status(200).json({
    success: true,
    result: totalRecords,
    data: records.map(sanitizeAttendance),
  });
});

export const employeeCheckinRange = asyncHandler(async (req, res) => {
  const { lat, lng, employeeId } = req.query;
  const employee = await Employee.findById(employeeId).populate('organization');
  const orgLocation = employee.organization.location;

  const isNearby = await Organization.findOne({
    _id: employee.organization._id,
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [lng, lat]
        },
        $maxDistance: 100
      },
    },
  });

  const withinRange = Boolean(isNearby);
  const message = withinRange
    ? `You are within the allowed check-in range of the organization.`
    : `You are outside the allowed check-in range.`;

  res.status(200).json({
    success: true,
    message,
    withinRange
  });
});
