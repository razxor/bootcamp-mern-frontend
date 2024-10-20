import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate  } from "react-router-dom";
import ROUTES from "../routes";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {    
    const { user, loading } = useContext(AuthContext);

    if(loading){
        return <Loader/>
    }
    if (user) {
        return children;
    }  
    return <Navigate to={`${ROUTES.LOGIN}`} replace />;
};

export default PrivateRoute;
