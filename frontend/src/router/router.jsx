import { Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import User from "../pages/User"
import PrivateRoute from "../components/privateRoute"

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route
                path="/user"
                element={
                    <PrivateRoute>
                        <User />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}

export default Router





