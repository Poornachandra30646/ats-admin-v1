import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Reports from "../pages/Reports";
import UserDetails from "../pages/UserDetails";
import Settings from "../pages/Settings";
function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/users"
          element={<Users />}
        />

        <Route
          path="/users/:id"
          element={<UserDetails />}
        />

        <Route
          path="/reports"
          element={<Reports />}
        />

        <Route
  path="/settings"
  element={<Settings />}
/>


      </Routes>

    </BrowserRouter>

  );

}

export default AppRoutes;