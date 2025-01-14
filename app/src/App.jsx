import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./views/Register";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import PrivateRouter from "./components/PrivateRouter";
import ResetPassword from "./views/ResetPassword";
import { UserProvider } from "./components/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRouter>
                  <Dashboard />
                </PrivateRouter>
              }
            />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
