import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import HomePage from "../features/home/pages/HomePage";
import RegistrationPage from "../features/auth/pages/RegistrationPage";
import EmailVerificationPage from "../features/auth/pages/EmailVerificationPage/EmailVerificationPage";
import LoginPage from "../features/auth/pages/LoginPage/LoginPage";
import TenantLayout from "./layouts/TenantLayout/TenantLayout";

export const router = createBrowserRouter([
    {
        element: <HomeLayout></HomeLayout>,
        children: [
            {path: "/home", element: <HomePage/>},
            {path: "/registration", element: <RegistrationPage/>},
            {path: "/verify-email", element: <EmailVerificationPage/>},
            {path: "/login", element: <LoginPage/>},
            {path: "/", element: <Navigate to="/home" replace />}
        ]
    },
    {
        element: <TenantLayout></TenantLayout>,
        
    },
    {path: "*", element: <Navigate to="/home" replace />}
]);