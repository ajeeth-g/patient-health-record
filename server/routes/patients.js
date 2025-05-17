const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Patient = require("../models/Patient");

// Get all patients
router.get("/", auth, async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Add new patient
router.post("/", auth, async (req, res) => {
  const { name, age, gender, diagnosis, prescriptionNotes } = req.body;

  if (!name || !age || !gender || !diagnosis) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const newPatient = new Patient({
      name,
      age,
      gender,
      diagnosis,
      prescriptionNotes,
    });
    const patient = await newPatient.save();
    res.json(patient);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Edit patient
router.put("/:id", auth, async (req, res) => {
  const { name, age, gender, diagnosis, prescriptionNotes } = req.body;
  const patientFields = { name, age, gender, diagnosis, prescriptionNotes };

  try {
    let patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: patientFields },
      { new: true }
    );
    res.json(patient);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

// Delete patient
router.delete("/:id", auth, async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Actually delete the patient
    await Patient.findByIdAndDelete(req.params.id);

    res.json({ message: "Patient removed" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
