import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"


const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token")

    if (!token) {
        return <Navigate to="/login_user" />
    }
    try {
        const decode = jwtDecode(token)

        const currentTime = Date.now() / 1000
        
        if (decode.exp < currentTime) {
            localStorage.removeItem("token")


            return <Navigate to='/login_user' />
        }

        return children
    } catch (error) {
        localStorage.removeItem("token")

        return <Navigate to="login_user" />
    }
}


export default ProtectedRoute;