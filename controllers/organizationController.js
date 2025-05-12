import asyncHandler from "express-async-handler";
import { sanitizeOrganization } from "../utils/sanitizeData.js";
import Organization from "../models/organizationModel.js";

// @desc    Create an organization
// @route   POST /api/organizations
// @access  Private/Admin
export const createOrganization = asyncHandler(async (req, res) => {
  const { name, location } = req.body;
  const organization = await Organization.create({
    name,
    location
  });

  res.status(201).json({
    success: true,
    message: "Organization created successfully",
    data: sanitizeOrganization(organization)
  });
});

// @desc    Get all organizations
// @route   GET /api/organizations
// @access  Private/Admin
export const getAllOrganization = asyncHandler(async (req, res) => {
  const totalOrganization = await Organization.countDocuments();
  const organizations = await Organization.find();

  res.status(201).json({
    success: true,
    result: totalOrganization,
    data: organizations.map(sanitizeOrganization)
  });
});

// @desc    Get an organization
// @route   GET /api/organizations/:organizationId
// @access  Private/Admin
export const getOrganization = asyncHandler(async (req, res, next) => {
  const { organizationId } = req.params;
  const organization = await Organization.findById(organizationId);

  res.status(200).json({
    success: true,
    data: sanitizeOrganization(organization)
  });
});

// @desc    Update an organization
// @route   PUT /api/organizations/:organizationId
// @access  Private/Admin
export const UpdateOrganization = asyncHandler(async (req, res, next) => {
  const { organizationId } = req.params;
  const organization = await Organization.findByIdAndUpdate(
    organizationId,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    message: "Organization updated successfully",
    data: sanitizeOrganization(organization)
  });
});

// @desc    Delete an organization
// @route   DELETE /api/organizations/:organizationId
// @access  Private/Admin
export const deleteOrganization = asyncHandler(async (req, res, next) => {
  const { organizationId } = req.params;
  await Organization.findByIdAndDelete(organizationId);

  res.status(200).json({
    success: true,
    message: "Organization deleted successfully"
  });
});
