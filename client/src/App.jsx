import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/Layout";
import Login from "./pages/Login";
import PatientsPage from "./pages/PatientsPage";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <DashboardLayout>
              <PatientsPage />
            </DashboardLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

export default App;
