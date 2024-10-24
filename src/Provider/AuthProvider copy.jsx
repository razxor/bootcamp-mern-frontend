import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    getAuth,
    onAuthStateChanged,
    GoogleAuthProvider,
    GithubAuthProvider,   
    signInWithPopup,
    signOut,
} from "firebase/auth";
import app from "../assets/firebase/firebase.config";


export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    
    const [user, setUser] = useState(null);
    const auth = getAuth(app);
    const [loading, setLoading] = useState(true);

    const createUser =  (payload) => {
        setLoading(true);
        
        console.log(payload);
        const {fullname, email, password, photo} = payload 
        const result =  createUserWithEmailAndPassword(auth, email, password);
        //insert into DB    
        const response = fetch(`${import.meta.env.VITE_BASE_URL}/api/signup`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({...payload, uid : result.user.uid, isAdmin:false})
        })

        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        const data = response.json()
        console.log(data);                        
           
        return result   
    };


    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const dBSignIn = (currentUser) => {
        return setUser(currentUser);        
    };

    const githubSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, githubProvider);
    };

    const updateUserProfile = (profile) => {
        setLoading(true);
        return updateProfile(auth.currentUser, profile);
    };

    const loginWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    };

    const logOutUser = () => {
        return signOut(auth);
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {              
            console.log(currentUser);
            if (currentUser) {               
                try {
                    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/user/${currentUser.uid}`);
                    
                    if (!response.ok) {
                        throw new Error("Failed to fetch");
                    }
                    console.log(response);     
                    const data = await response.json();
                    if(data){
                        setUser(data)
                        setLoading(false); 
                    }
                    setUser(data);   
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                    unsubscribe();
                } finally {
                    setLoading(false);  // Set loading state to false whether it succeeds or fails
                }
            } else {
                setUser(null);
                setLoading(false);  // Set loading state to false if no currentUser
            }
            
        });
        return () => {
            unsubscribe();
        };
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        dBSignIn,
        loginWithGoogle,
        githubSignIn,
        updateUserProfile,
        logOutUser,
    };

    return (
        <>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </>
    );
};
export default AuthProvider;
