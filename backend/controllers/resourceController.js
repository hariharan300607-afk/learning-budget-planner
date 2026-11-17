
const Resource = require("../models/Resource");

// GET: Get all resources
const getResources = async (req, res) => {
  try {
    const resources = await Resource.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resources.length,
      data: resources,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve resources",
      error: error.message,
    });
  }
};

// POST: Create a new resource
const createResource = async (req, res) => {
  try {
    const { name, category, price } = req.body;

    const resource = await Resource.create({
      name,
      category,
      price,
    });

    res.status(201).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create resource",
      error: error.message,
    });
  }
};


// PUT: Update an existing resource
const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      data: resource,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update resource",
      error: error.message,
    });
  }
};

// DELETE: Delete a resource
const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);

    if (!resource) {
      return res.status(404).json({
        success: false,
        message: "Resource not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Resource deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to delete resource",
      error: error.message,
    });
  }
};

module.exports = {
  getResources,
  createResource,
  updateResource,
  deleteResource,
};
