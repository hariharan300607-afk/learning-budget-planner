
const express = require("express");

const router = express.Router();

const {
  getResources,
  createResource,
  updateResource,
  deleteResource,
} = require("../controllers/resourceController");

// GET all resources and POST a new resource
router.route("/")
  .get(getResources)
  .post(createResource);

// PUT update and DELETE a resource by ID
router.route("/:id")
  .put(updateResource)
  .delete(deleteResource);

module.exports = router;
