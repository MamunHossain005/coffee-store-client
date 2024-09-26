import { useEffect, useState } from "react";
import { createContext } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase/firebase.config";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [successText, setSuccessText] = useState("");
    const [errorText, setErrorText] = useState("");
    const MySwal = withReactContent(Swal);

    //register user
    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    //login user
    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    //logout user
    const logoutUser = () => {
        setLoading(true);
        return signOut(auth);
    }

    //reset password
    const resetPassword = email => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }

    //user current state
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, user => {
            setUser(user);
            setLoading(false);
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {user, loading, setSuccessText, setErrorText, registerUser, loginUser, logoutUser, resetPassword};

    if(successText){
        MySwal.fire({
            icon: 'success',
            title: 'Success!!!',
            text: successText,
            color: 'green',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'green',
        })
    }
    else if(errorText){
        MySwal.fire({
            icon: 'error',
            title: 'Error!!!',
            text: errorText,
            color: 'red',
            confirmButtonText: 'Ok',
            confirmButtonColor: 'red',
        })
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;