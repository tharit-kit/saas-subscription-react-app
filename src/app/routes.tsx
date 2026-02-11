import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "../features/home/pages/HomePage";
import RegistrationPage from "../features/auth/pages/RegistrationPage";

export const router = createBrowserRouter([
    {
        element: <HomeLayout></HomeLayout>,
        children: [
            {path: "/home", element: <HomePage/>},
            {path: "/registration", element: <RegistrationPage/>},
            {path: "/", element: <Navigate to="/home" replace />}
        ]
    },
    {path: "*", element: <Navigate to="/home" replace />}
]);