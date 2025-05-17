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

  // Update formData when initialData changes (for edit)
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
  }, [initialData, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (initialData && initialData._id) {
        // Edit mode: PUT request
        const res = await patientsAPI.put(`/patients/${initialData._id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onSubmit(res.data);
      } else {
        // Add mode: POST request
        const res = await patientsAPI.post("/patients", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        onSubmit(res.data);
      }
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
