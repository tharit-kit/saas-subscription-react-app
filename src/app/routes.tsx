import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "../features/home/pages/HomePage";
import RegistrationPage from "../features/auth/pages/RegistrationPage";
import CheckYourEmailPage from "../features/auth/pages/CheckYourEmailPage";

export const router = createBrowserRouter([
    {
        element: <HomeLayout></HomeLayout>,
        children: [
            {path: "/home", element: <HomePage/>},
            {path: "/registration", element: <RegistrationPage/>},
            {path: "/check-your-email", element: <CheckYourEmailPage></CheckYourEmailPage>},
            {path: "/", element: <Navigate to="/home" replace />}
        ]
    },
    {path: "*", element: <Navigate to="/home" replace />}
]);