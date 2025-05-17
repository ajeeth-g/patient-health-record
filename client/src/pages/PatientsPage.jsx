import { useEffect, useState } from "react";
import patientsAPI from "../api/patientsAPI";
import Patients from "./Patients";

const columns = [
  { header: "Name", accessor: "name" },
  { header: "Age", accessor: "age" },
  { header: "Gender", accessor: "gender" },
  { header: "Diagnosis", accessor: "diagnosis" },
  { header: "Prescription Notes", accessor: "prescriptionNotes" },
];

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await patientsAPI.get("/patients");
        setPatients(response.data);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
        alert("Failed to load patient data.");
      }
    };

    fetchPatients();
  }, []);

  // Update patient
  const handleEditPatient = async (updatedPatient) => {
    try {
      const response = await patientsAPI.put(
        `/patients/${updatedPatient._id}`,
        updatedPatient
      );
      setPatients((prev) =>
        prev.map((patient) =>
          patient._id === updatedPatient._id ? response.data : patient
        )
      );
      alert("Patient updated successfully.");
    } catch (error) {
      console.error("Error updating patient:", error);
      alert("Failed to update patient.");
    }
  };

  // Delete patient
  const handleDeletePatient = async (id) => {
    try {
      await patientsAPI.delete(`/patients/${id}`);
      setPatients((prev) => prev.filter((patient) => patient._id !== id));
      alert("Patient deleted successfully.");
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  // Add new patient
  const handleAddPatient = (newPatient) => {
    setPatients((prev) => [...prev, newPatient]);
    alert("Patient added successfully.");
  };

  return (
    <Patients
      columns={columns}
      data={patients}
      onEdit={handleEditPatient}
      onDelete={handleDeletePatient}
      onAdd={handleAddPatient}
    />
  );
};

export default PatientsPage;
