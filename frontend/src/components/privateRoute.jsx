import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn)
    return isLoggedIn ? children : <Navigate to="/sign-in" />

}

export default PrivateRoute