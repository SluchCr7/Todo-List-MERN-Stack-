'use client'
import axios from "axios";
import { useContext, createContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { useAlert } from "./AlertContext";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  
    const [user, setUser] = useState(null);
    const [isLogin , setIsLogin] = useState(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const [showLoginMenu , setShowLoginMenu] = useState(false)
    const [showRegisterMenu , setShowRegisterMenu] = useState(false)
    const {showAlert} = useAlert()
    const [users, setUsers] = useState([])
    const [myUser, setMyUser] = useState(null)
    // useEffect(() => {
    //   const fetchUsers = async () => {
    //     try {
    //       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth`);
    //       setUsers(data);
    //     } catch (error) {
    //       console.error("Error fetching users:", error);
    //     }
    //   }
    //   fetchUsers();
    // }, []);
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/me`, {
            headers: {
              "Authorization": `Bearer ${user?.token}`,
            },
          });
          setMyUser(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };

      if (user?.token) {
        fetchUser();
      }
    }, [user]); 

    const login = async (email, password) => {
        try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/login`, {
            email,
            password,
        });
    
        // لو نجح الدخول
        setUser(res.data);
        localStorage.setItem('TodoUser', JSON.stringify(res.data));
        localStorage.setItem('loginStateTodo', 'true');
    
        showAlert(res.data.message || 'Login successful');
    
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
        } catch (err) {
        const message = err.response?.data?.message || 'Login failed';
    
        if (err.response?.status === 401 && err.response?.data?.emailSent) {
            showAlert(message); // مثال: "Your email is not verified. A verification email has been sent."
        } else {
            showAlert(message); // أي خطأ آخر
        }
        }
    };
  
  

  const Logout = () => {
    swal({
      title: 'Are you sure?',
      text: 'You are going to logout from your account!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willLogout) => {
      if (willLogout) {
        setUser(null);
        setIsLogin(false);
        localStorage.removeItem('TodoUser');
        localStorage.removeItem('loginStateTodo');
        // window.location.href = '/Pages/Login';
      }
    });
  };

  const registerNewUser = async (name, email, password) => {
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BACK_URL}/api/auth/register`, {name, email, password });
      showAlert(res.data.message);
    } catch (err) {
      swal('Oops!', err.response?.data?.message || 'Registration failed', 'error');
    }
  };
  useEffect(() => {
    const storedUser = localStorage.getItem('TodoUser');
    const loginState = localStorage.getItem('loginStateTodo');

    if (storedUser && loginState === 'true') {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    setIsAuthChecked(true);
  }, []);
    return (
        <UserContext.Provider value={{ user,myUser,users,showRegisterMenu , setShowRegisterMenu,showLoginMenu , setShowLoginMenu, setUser , isLogin , setIsLogin , login , Logout , registerNewUser , isAuthChecked }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);