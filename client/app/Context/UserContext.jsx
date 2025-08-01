'use client'
import axios from "axios";
import { useContext, createContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { useAlert } from "./AlertContext";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const { showAlert } = useAlert();

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`, {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("TodoToken", token);
      localStorage.setItem("loginStateTodo", "true");

      showAlert(res.data.message || "Login successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      showAlert(message);
    }
  };

  const Logout = () => {
    swal({
      title: "Are you sure?",
      text: "You are going to logout from your account!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        setUser(null);
        setIsLogin(false);
        localStorage.removeItem("TodoToken");
        localStorage.removeItem("loginStateTodo");
        window.location.href = "/";
      }
    });
  };

  const registerNewUser = async (name, email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, {
        name, email, password
      });
      showAlert(res.data.message);
    } catch (err) {
      swal("Oops!", err.response?.data?.message || "Registration failed", "error");
    }
  };

  const fetchUserFromMe = async () => {
    const token = localStorage.getItem("TodoToken");
    if (!token) {
      setIsAuthChecked(true);
      return;
    }

    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser({ ...data, token });
      setIsLogin(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLogin(false);
      setUser(null);
    } finally {
      setIsAuthChecked(true);
    }
  };

  useEffect(() => {
    const loginState = localStorage.getItem("loginStateTodo");
    if (loginState === "true") {
      fetchUserFromMe();
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        isLogin,
        isAuthChecked,
        showLoginMenu,
        setShowLoginMenu,
        showRegisterMenu,
        setShowRegisterMenu,
        login,
        Logout,
        registerNewUser,
        setUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);