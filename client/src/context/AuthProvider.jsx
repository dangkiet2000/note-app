import React, { createContext, useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribed = auth.onIdTokenChanged((user) => {
      if (user?.uid) {
        setUser(user);

        if (user.accessToken !== localStorage.getItem("accessToken")) {
          localStorage.setItem("accessToken", user.accessToken);
          window.location.reload();
        }
        // Save access token to local storage.
        setIsLoading(false);
        return; // Prevent execute some code below
      }

      // Reset user info - Case user is removed from my App
      setUser({});
      setIsLoading(false);
      localStorage.clear();
      navigate("/login");
    });

    return () => {
      unsubscribed();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}
