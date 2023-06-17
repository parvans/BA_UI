import { useContext, createContext, useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from "views/ezhuth/firebase";
const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
            setUser(currentuser)
            console.log("USER",currentuser);
        })
        return ()=>{
            unsubscribe();
        }
    }, [])
    return <AuthContext.Provider value={{googleSignIn}}>{children}</AuthContext.Provider>
}

export const UserAuth = () => {
    return useContext(AuthContext);
}
