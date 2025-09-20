const Resource = require("../models/Resources");
const Hospital = require("../models/Hospital");

//dist. cal hoga
function getDistance(lat1, lon1, lat2, lon2) {
  function toRad(x) { return x * Math.PI / 180; }
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2)**2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2)**2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

exports.suggestHospitals = async (req, res) => {
  try {
    const {
      patientLat,
      patientLon,
      city,
      pincode,
      requiredBeds = 1,
      requiredDoctors = 1,
      requiredNurses = 1,
      requiredMedicines = []
    } = req.body;

    
    let resources = await Resource.find().populate("hospitalId");

    
    if (!patientLat || !patientLon) {
      resources = resources.filter(r =>
        (!city || r.hospitalId.location.city === city) &&
        (!pincode || r.hospitalId.location.pincode === pincode)
      );
    }

    const suggestions = resources
      .filter(r =>
        r.bedsAvailable >= requiredBeds &&
        r.staffAvailable.doctors >= requiredDoctors &&
        r.staffAvailable.nurses >= requiredNurses &&
        requiredMedicines.every(med => r.medicines.some(hMed => hMed.name === med && hMed.quantity > 0))
      )
      .map(r => {
        let distance = null;

        
        if (patientLat && patientLon && r.hospitalId.location.lat && r.hospitalId.location.lon) {
          distance = getDistance(patientLat, patientLon, r.hospitalId.location.lat, r.hospitalId.location.lon);
        }

        
        const resourceScore = (r.bedsAvailable - requiredBeds) +
                              (r.staffAvailable.doctors - requiredDoctors) +
                              (r.staffAvailable.nurses - requiredNurses);

        const priorityScore = distance !== null ? resourceScore - distance * 0.5 : resourceScore;

        return {
          hospital: r.hospitalId.name,
          location: r.hospitalId.location,
          distance: distance ? distance.toFixed(2) : null,
          priorityScore,
          shortages: []
        };
      })
      .sort((a, b) => b.priorityScore - a.priorityScore);

    res.status(200).json(suggestions);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while suggesting hospitals" });
  }
};