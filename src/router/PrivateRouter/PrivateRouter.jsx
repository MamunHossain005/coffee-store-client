import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    if(loading) {
        return <div className="h-screen flex items-center justify-center"><span className="loading loading-spinner loading-lg"></span></div>
    }

    if(user) {
        if(user.emailVerified){
          return children;  
        }
        else return <div className="h-screen flex items-center justify-center"><p className="text-3xl font-bold text-red-600">Please verify your email!!!</p></div>
    }


    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivateRouter;