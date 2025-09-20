
const Resource = require("../models/Resources");
const Hospital = require("../models/Hospital");

exports.upsertResource = async (req, res) => {
  try {
    const { hospitalId } = req.body;

    const hospitalExists = await Hospital.findById(hospitalId);
    if (!hospitalExists) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    const resource = await Resource.findOneAndUpdate(
      { hospitalId },
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json(resource);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const resources = await Resource.find().populate("hospitalId");
    res.json(resources);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getResourceByHospital = async (req, res) => {
  try {
    const resource = await Resource.findOne({ hospitalId: req.params.hospitalId }).populate("hospitalId");
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) return res.status(404).json({ message: "Resource not found" });
    res.json({ message: "Resource deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
