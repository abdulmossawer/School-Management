const School = require("../models/schoolModel");
const haversineDistance = require("../utils/haversine");

exports.addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    if (
      !name ||
      !address ||
      latitude === undefined ||
      longitude === undefined
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const school = new School({ name, address, latitude, longitude });
    await school.save();
    res.status(200).json({ message: "School added successfuly" });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Something is wrong school not added",
        error: err.message,
      });
  }
};

exports.listSchools = async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required." });
    }

    const userLocation = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };
    const schools = await School.find();

    const sortedSchools = schools
      .map((school) => {
        const distance = haversineDistance(userLocation, {
          latitude: school.latitude,
          longitude: school.longitude,
        });
        return { ...school._doc, distance };
      })
      .sort((a, b) => a.distance - b.distance);

    res.status(200).json(sortedSchools);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching schools", error: err.message });
  }
};
