import { Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import PopupForm from "../components/PopupForm";

const Patients = ({ columns = [], data = [], onEdit, onDelete, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingRow, setEditingRow] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const filteredData = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return searchTerm
      ? data.filter((row) =>
          ["name", "diagnosis"].some((key) =>
            row[key]?.toString().toLowerCase().includes(lowerSearch)
          )
        )
      : data;
  }, [searchTerm, data]);

  const handleFormSubmit = (formData) => {
    if (editingRow) {
      onEdit(formData);
    } else {
      onAdd(formData);
    }
    setEditingRow(null);
    setOpenForm(false);
  };

  const handleEditClick = (row) => {
    setEditingRow(row);
    setOpenForm(true);
  };

  const handleAddClick = () => {
    setEditingRow(null);
    setOpenForm(true);
  };

  const handleDeleteClick = (rowId) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      onDelete(rowId);
    }
  };

  return (
    <Box
      x={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        overflow: "hidden",
      }}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <Typography variant="h5">Patient Records</Typography>
        <Button
          variant="contained"
          onClick={handleAddClick}
          sx={{ color: "#fff", fontWeight: 600, textTransform: "none" }}
        >
          Add Patient
        </Button>
      </Stack>

      <TextField
        label="Search by Name or Diagnosis"
        variant="outlined"
        margin="dense"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        fullWidth
      />

      <TableContainer
        component={Paper}
        elevation={3}
        sx={{
          flex: 1,
          overflow: "auto",
          width: "100%",
          "& .MuiTable-root": {
            minWidth: 650,
          },
        }}
      >
        <Box
          sx={{
            minWidth: "fit-content", 
            width: "100%",
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map(({ header, accessor }) => (
                  <TableCell key={accessor} sx={{ fontWeight: "bold" }}>
                    {header}
                  </TableCell>
                ))}
                <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((row, rowIndex) => (
                  <TableRow key={row._id || rowIndex}>
                    {columns.map(({ accessor }) => (
                      <TableCell key={`${rowIndex}-${accessor}`}>
                        {row[accessor]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <IconButton onClick={() => handleEditClick(row)}>
                        <Edit />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteClick(row._id || rowIndex)}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} align="center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </TableContainer>

      <PopupForm
        initialData={editingRow}
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditingRow(null);
        }}
        onSubmit={handleFormSubmit}
      />
    </Box>
  );
};

export default Patients;
