
const Resource = require("../models/Resources");
const Hospital = require("../models/Hospital");

exports.getShortages = async (req, res) => {
  try {
    const BED_THRESHOLD = 5;
    const DOCTOR_THRESHOLD = 2;
    const NURSE_THRESHOLD = 5;
    const MEDICINE_THRESHOLD = 10;

    const resources = await Resource.find().populate("hospitalId");

    const shortages = resources
      .map(resource => {
        const bedsShort = resource.bedsAvailable < BED_THRESHOLD;
        const staffShort = resource.staffAvailable.doctors < DOCTOR_THRESHOLD || resource.staffAvailable.nurses < NURSE_THRESHOLD;
        const medicineShort = resource.medicines.some(med => med.quantity < MEDICINE_THRESHOLD);

        if (bedsShort|| staffShort  ||medicineShort) {
          return {
            hospital: resource.hospitalId.name,
            location: resource.hospitalId.location,
            bedsShort,
            medicineShort,
            staffShort
          };
        } else {
          return null;
        }
      })
      .filter(item => item !== null);

    res.status(200).json(shortages);
  } catch (error) {
    console.error("Error fetching shortages:", error.message);
    res.status(500).json({ message: "Server error while fetching shortages" });
  }
};