import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "./views/Register";
import Login from "./views/Login";
import PrivateRouter from "./components/PrivateRouter";
import ResetPassword from "./views/ResetPassword";
import { UserProvider } from "./components/UserProvider";
import Home from "./views/Home";
import { Toaster } from "react-hot-toast";

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
              path="/"
              element={
                <PrivateRouter>
                  <Home />
                </PrivateRouter>
              }
            />
          </Routes>
        </div>
      </Router>
      <Toaster />
    </UserProvider>
  );
}

export default App;
