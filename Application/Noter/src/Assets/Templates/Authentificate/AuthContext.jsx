import { createContext, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../../firebase";
import { useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState({});

   // console.log(user);

   const googleSignIn = async () => {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
   };
   const logout = async () => {
       await signOut(auth);
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user);
         console.log(user);
      });
      return () => {
         unsubscribe();
      };
   }, []);

   return <AuthContext.Provider value={{ googleSignIn, logout, user }}>{children}</AuthContext.Provider>;
};

export { AuthContextProvider, AuthContext };
