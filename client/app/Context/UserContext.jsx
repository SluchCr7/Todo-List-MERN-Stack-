'use client'
import axios from "axios";
import { useContext, createContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { useAlert } from "./AlertContext";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // هذا سيكون دائما المستخدم النهائي بعد getMe
  const [isLogin, setIsLogin] = useState(false);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [showLoginMenu, setShowLoginMenu] = useState(false);
  const [showRegisterMenu, setShowRegisterMenu] = useState(false);
  const { showAlert } = useAlert();

  // ⬇️ تسجيل الدخول
  const login = async (email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`, {
        email,
        password,
      });

      // حفظ التوكن فقط
      const tokenData = res.data;
      localStorage.setItem("TodoToken", tokenData.token);
      localStorage.setItem("loginStateTodo", "true");

      showAlert(tokenData.message || "Login successful");

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      if (err.response?.status === 401 && err.response?.data?.emailSent) {
        showAlert(message);
      } else {
        showAlert(message);
      }
    }
  };

  // ⬇️ تسجيل الخروج
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

  // ⬇️ إنشاء مستخدم جديد
  const registerNewUser = async (name, email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, {
        name,
        email,
        password,
      });
      showAlert(res.data.message);
    } catch (err) {
      swal("Oops!", err.response?.data?.message || "Registration failed", "error");
    }
  };

  // ⬇️ تحميل بيانات المستخدم من /me
  const fetchUserFromMe = async () => {
    const token = localStorage.getItem("TodoToken");
    if (!token) return;

    try {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({ ...data, token });
      setIsLogin(true);
    } catch (error) {
      console.error("Error fetching user:", error);
      setIsLogin(false);
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
        setUser,
        setIsLogin,
        login,
        Logout,
        registerNewUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
