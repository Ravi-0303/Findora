
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportLost from "./pages/ReportLost";
import ReportFound from "./pages/ReportFound";
import ItemDetails from "./pages/ItemDetails";
import ClaimItem from "./pages/ClaimItem";
import MyClaims from "./pages/MyClaims";
import AdminDashboard from "./pages/AdminDashboard";
import EditItem from "./pages/EditItem";

import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Student Pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="student">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report-lost"
          element={
            <ProtectedRoute allowedRole="student">
              <ReportLost />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report-found"
          element={
            <ProtectedRoute allowedRole="student">
              <ReportFound />
            </ProtectedRoute>
          }
        />

        <Route
          path="/item-details"
          element={
            <ProtectedRoute allowedRole="student">
              <ItemDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/item/:id"
          element={
            <ProtectedRoute allowedRole="student">
              <ItemDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/claim-item"
          element={
            <ProtectedRoute allowedRole="student">
              <ClaimItem />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-claims"
          element={
            <ProtectedRoute allowedRole="student">
              <MyClaims />
            </ProtectedRoute>
          }
        />

        {/* Admin Page */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
            path="/edit-item"
            element={
              <ProtectedRoute allowedRole="student">
                <EditItem />
              </ProtectedRoute>
            }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
