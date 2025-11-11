import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home"
import Login from "../pages/Login"
import Profile from "../pages/Profile"
import PrivateRoute from "../components/privateRoute"

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-in" element={<Navigate to="/login" replace />} /> {/* Redirection */}
            <Route
                path="/profile"
                element={
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>
                }
            />
        </Routes>

    )
}

export default Router





