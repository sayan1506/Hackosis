
const mongoose = require("mongoose");
const Resource = require("./Resources");

const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  contact: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

hospitalSchema.pre("findOneAndDelete", async function (next) {
  const hospitalId = this.getQuery()["_id"];
  await Resource.deleteMany({ hospitalId });
  next();
});

const Hospital = mongoose.model("Hospital", hospitalSchema);
module.exports = Hospital;
