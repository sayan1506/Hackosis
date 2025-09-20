
const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  bedsAvailable: {
    type: Number,
    required: true,
    min: 0,
  },
  medicines: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true, min: 0 },
    },
  ],
  staffAvailable: {
    doctors: { type: Number, default: 0 },
    nurses: { type: Number, default: 0 },
    support: { type: Number, default: 0 },
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

const Resource = mongoose.model("Resource", resourceSchema);
module.exports = Resource;
