import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import patientsAPI from "../api/patientsAPI";

const PopupForm = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    diagnosis: "",
    prescriptionNotes: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        age: "",
        gender: "",
        diagnosis: "",
        prescriptionNotes: "",
      });
    }
    setErrors({}); // Clear errors on open
  }, [initialData, open]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.age) newErrors.age = "Age is required";
    if (formData.age < 0) newErrors.age = "Age cannot be negative";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.diagnosis.trim())
      newErrors.diagnosis = "Diagnosis is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      let res;
      if (initialData && initialData._id) {
        res = await patientsAPI.put(
          `/patients/${initialData._id}`,
          formData,
          config
        );
      } else {
        res = await patientsAPI.post("/patients", formData, config);
      }
      onSubmit(res.data);
    } catch (error) {
      console.error("Error saving patient data:", error);
      alert("Failed to save patient data.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? "Edit Patient" : "Add Patient"}</DialogTitle>
      <DialogContent dividers>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
          inputProps={{ min: 0 }}
          error={!!errors.age}
          helperText={errors.age}
        />
        <TextField
          label="Gender"
          name="gender"
          select
          value={formData.gender}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
          error={!!errors.gender}
          helperText={errors.gender}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
        <TextField
          label="Diagnosis"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          fullWidth
          margin="dense"
          required
          error={!!errors.diagnosis}
          helperText={errors.diagnosis}
        />
        <TextField
          label="Prescription Notes"
          name="prescriptionNotes"
          value={formData.prescriptionNotes}
          onChange={handleChange}
          fullWidth
          margin="dense"
          multiline
          rows={3}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {initialData ? "Update" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupForm;
