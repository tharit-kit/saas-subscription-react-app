import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "./layouts/HomeLayout/HomeLayout";
import HomePage from "../features/home/pages/HomePage";
import RegistrationPage from "../features/auth/pages/RegistrationPage";
import EmailVerificationPage from "../features/auth/pages/EmailVerificationPage";

export const router = createBrowserRouter([
    {
        element: <HomeLayout></HomeLayout>,
        children: [
            {path: "/home", element: <HomePage/>},
            {path: "/registration", element: <RegistrationPage/>},
            {path: "/verify-email", element: <EmailVerificationPage/>},
            {path: "/", element: <Navigate to="/home" replace />}
        ]
    },
    {path: "*", element: <Navigate to="/home" replace />}
]);