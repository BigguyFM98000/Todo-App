import logo from "./logo.svg";
import React, { useState, useEffect, Fragment } from "react";
import "./App.css";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Navbar from "./components/Navbar";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleUser, setGoogleUser] = useState([]);
  const [profile, setProfile] = useState([]);
  console.log(email, password);
  console.log(googleUser);
  console.log(profile);

  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };
    console.log(data);

    setEmail("");
    setPassword("");
  };

  return (
    
      <Navbar name={profile.name} picture={profile.picture}/>
              
  );
}

export default App;
