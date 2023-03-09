
import React, { useState, useEffect, Fragment } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Landing from "./Landing";
import Loginform from "./Loginform";

function Login() {
  
  const [googleUser, setGoogleUser] = useState([]);
  const [profile, setProfile] = useState([]);
 
  console.log(googleUser);
  console.log(profile);

  const googlelogin = useGoogleLogin({
    onSuccess: (codeResponse) => setGoogleUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (googleUser) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${googleUser.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${googleUser.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [googleUser]);

  return (
    <div>
        {googleUser ? (
            <Loginform  googlelogin={googlelogin}/>
        ) : <Landing picture={profile.picture} name={profile.name} family_name={profile.family_name} given_name={profile.given_name}/>}
    </div>

  );
}

export default Login;
