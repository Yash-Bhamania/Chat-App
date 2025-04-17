import "./App.css";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./Component/Navbar";
import HomePage from "./Pages/HomePage";
import SignUpPage from "./Pages/SignUpPage";
import LogInPage from "./Pages/LogInPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from './store/useThemeStore';


const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  const { theme, } = useThemeStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // console.log({ authUser });

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: authUser ? <HomePage /> : <Navigate to="/login" />,
        },
        {
          path: "home",
          element: authUser ? <HomePage /> : <Navigate to="/login" />,
        },
        {
          path: "settings",
          element: authUser ? <SettingsPage /> : <Navigate to="/login" />,
        },
        {
          path: "profile",
          element: authUser ? <ProfilePage /> : <Navigate to="/login" />,
        },
        {
          path: "signup",
          element: !authUser ? <SignUpPage /> : <Navigate to="/" />,
        },
        {
          path: "login",
          element: !authUser ? <LogInPage /> : <Navigate to="/" />,
        },
      ],
    },
  ]);

  return (
    <div data-theme={theme} >
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
