import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate  } from "react-router-dom";
import ROUTES from "../routes";
import Loader from "../components/Loader";

const AdminRoute = ({ children }) => {    
    const { user, loading } = useContext(AuthContext);

    if(loading){
        return <Loader/>
    }
    // console.log(user);
    if (user && user.isAdmin) {
        return children;
    }  
    return <Navigate to={`${ROUTES.LOGIN}`} replace />;
};

export default AdminRoute;
