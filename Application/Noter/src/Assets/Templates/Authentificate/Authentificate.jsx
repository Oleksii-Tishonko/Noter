import React, { useEffect } from "react";
import GoogleButton from "./Google Button/GoogleButton";
import { AuthContext } from "./AuthContext";
import { useState, useContext } from "react";
import "./AuthentificateStyles.css";

const Authentificate = () => {
   const { googleSignIn, logout, user } = useContext(AuthContext);
   const  [renderer, setRenderer]  = useState(0);

   const handleAuth = async () => {
      try {
         await googleSignIn();
      } catch (error) {
         console.log(error);
      }
   };

   const handleLogOut = async () => {
      try {
         await logout();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      setRenderer((x) => x + 1);
      console.log('user changed');
      if(user) console.log(user.displayName);
      
   }, [user]);

   return (
      <div className="Authentificate">
         {!user && (
            <div className="authForm">
               <h1 className="header">Authentificate</h1>
               <h2 className="subheader">Login / Signup</h2>
               <GoogleButton onClick={() => handleAuth()} />
            </div>
         )}
         {user && (
            <div className="checkingUserPage">
               <div className="userStatusCheckBar">
                  <h2 className="header">Loading account information</h2>
                  <h3 className="subheader">Checking user status...</h3>
               </div>

               <div class="loading-bar">
                  <div class="loading-line1"></div>
                  <div class="loading-line2"></div>
               </div>
            </div>
         )}

         <button className="logout" onClick={handleLogOut}>logOut</button>
         {/* <h2>Username: {user?.displayName}</h2>
         <img src={user?.photoURL} /> */}
      </div>
   );
};

export default Authentificate;
