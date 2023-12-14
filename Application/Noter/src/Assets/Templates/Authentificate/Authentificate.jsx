import React, { useEffect, useLayoutEffect } from "react";
import GoogleButton from "./Google Button/GoogleButton";
import { AuthContext } from "./AuthContext";
import { useState, useContext } from "react";
import "./AuthentificateStyles.css";
import useFetch from "../../Scripts/useFetch";
import { setUserId } from "firebase/analytics";
import { useNavigate } from "react-router-dom";
import cache from "../../../Сache/cache";
import { set } from "lodash";
import globals from "../../../globals";

let ErrorCreatingUser = false;

const Authentificate = () => {
   const { googleSignIn, logout, user } = useContext(AuthContext);
   const  [renderer, setRenderer]  = useState(0);
   const navigate = useNavigate();

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
      if(user && user.uid) {
        console.log(user.displayName);
        navigate("/authentificate/loadUserData");
    }
      
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

         {/* <h2>Username: {user?.displayName}</h2>
         <img src={user?.photoURL} /> */}
      </div>
   );
};

const LogoutButton = () => {
    const { logout } = useContext(AuthContext);

    const handleLogOut = async () => {
        try {
            await logout();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <button className="logout" onClick={handleLogOut}>
            logOut
        </button>
    );
};

const LoadingUserData = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [data, setData] = useState(null); 
    const [timeOnPage, setTimeOnPage] = useState(0);
    const minTimeOnPage = 6;

    useEffect(() => {
        const timerId = setInterval(() => {
            setTimeOnPage((x) => x + 1);
        }, 1000);

        return () => clearInterval(timerId);
    }, []);

    useEffect(() => {
        if(timeOnPage < minTimeOnPage) return;
        if(!data) return;
        if (!user || !user.uid) return;

        if (data.data.userExist) {
           navigate("/products");
        } else {
           navigate("/authentificate/createUser");
        }
    }, [timeOnPage]);
    

    if(!user) navigate('/authentificate');

    useEffect(() => {
        // Go to authentificate page if user not logged in
        if (!user || !user.uid) navigate("/authentificate");
        LoadData();
    }, []);

    useEffect(() => {
        // Go to authentificate page if user logged out
        if(!user) navigate('/authentificate');
    }, [user]);



    return (
       <div className="Authentificate">
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

            <LogoutButton />

            <div className="error">{error}</div>
       </div>
    );

    function LoadData(){
        const RestAPI = cache.RestAPI;
        
        const url = `http://127.0.0.1:3050/api/v1/users/userExist?uid=${user.uid}`;
        RestAPI.ReadData(url, '.', OnDataLoaded);
    }

    function OnDataLoaded(data, status, err){
        if(status === "OK"){
            setData(data);
        }
        else{
            setError('Error loading user data');
        }
    }
    
}

const CreateUserAccount = () => {
    const { user } = useContext(AuthContext);
    const [readyToCreateUser, setReadyToCreateUser] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [validationError, setValidationError] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useLayoutEffect(() => {
        if(!user || !user.uid) navigate('/authentificate');
        console.log("ErrorCreatingUser: " + ErrorCreatingUser);
        if(ErrorCreatingUser) setError("Error creating user. Please try again.");
    }, []);

    useEffect(() => {
        console.log("firstName: " + firstName);
        console.log("lastName: " + lastName);

        const isValidName = (value) => {
            value = value.trim();
            let isValid = true;

            if (value.includes(" ")) {
               isValid = false;
               setValidationError("Name can not contain spaces.");
            } else if (!/^[a-zA-Z]*$/.test(value)) {
               isValid = false;
               setValidationError("Name can only contain letters.");
            } else if (value === "") {
               isValid = false;
            } else if (!/^[A-Z]/.test(value)) {
               isValid = false;
               setValidationError("Name must start with a capital letter.");
            }
            else if(value.length < 2){
                isValid = false;
                setValidationError("Name must be at least 2 characters long.");
            }

            return isValid;
        };
        setValidationError(null);

        isValidName(lastName);
        setReadyToCreateUser(isValidName(firstName) && isValidName(lastName));

    }, [firstName, lastName]);

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(name === 'firstName') setFirstName(value);
        if(name === 'lastName') setLastName(value);
    }

    const CreateUser = () => {
       const RestAPI = cache.RestAPI;

       const url = `${globals.DATABASE}/api/v1/users`;
       const data = {
          uid: user.uid,
          firstName: firstName,
          lastName: lastName,
          email: user.email,
       };
        ErrorCreatingUser = false;

        RestAPI.WriteData(url, data, OnUserCreated);
        navigate('/authentificate/loadUserData');
    };

    function OnUserCreated(data, status, err){
        if(status === "OK") console.log("User created");
        else {
            console.log("Error creating user")
            ErrorCreatingUser = true;
        };
    }

    return (
       <div className="createUser">
          <h1 className="header">Create User Account</h1>
          <form className="createUserForm">
             <label for="first_name">First Name</label>
             <input type="text" id="first_name" name="firstName" placeholder="First Name" onChange={handleInputChange} />

             <label for="last_name">Last Name</label>
             <input type="text" id="last_name" name="lastName" placeholder="Last Name" onChange={handleInputChange} />
          </form>
          <button className="createUserButton" disabled={!readyToCreateUser} onClick={() => CreateUser()}>
             Continue
          </button>
          <div className="ValidationError">{validationError}</div>
          <div className="error">{error}</div>
       </div>
    );
}

export {Authentificate, LoadingUserData, CreateUserAccount};
