import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

/**
 * This component is used to protect routes that require the user to be logged in
 * @param {Object} Children component to be rendered if the user is logged in
 * @returns {Object} If the user is logged in, the children component 
 * is returned, otherwise the user is redirected to the login page.
 */
const ProtectedRoute = ({children}) => {
    const {currentUser} = useAuth();

    if(!currentUser){
        return <Navigate to="/iniciar-sesion" />
    }
    return children;
};

export default ProtectedRoute;