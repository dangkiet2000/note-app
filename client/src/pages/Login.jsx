import React, { useContext } from "react";
import { Typography, Button } from "@mui/material";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { GraphQLRequest } from "../utils/request";

const Login = () => {
  const auth = getAuth();
  const { user } = useContext(AuthContext);

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);

    const { data } = await GraphQLRequest({
      query: `mutation register($uid: String!, $name: String!){
      register(uid: $uid, name: $name){
        uid
        name
      }
    }`,
      variables: {
        uid: uid,
        name: displayName,
      },
    });

    console.log(data);
  };

  if (localStorage.getItem("accessToken")) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "10px" }}>
        Welcome to Note App
      </Typography>

      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
};

export default Login;
