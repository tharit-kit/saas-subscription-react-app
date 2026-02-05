import { createBrowserRouter, Navigate } from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import HomePage from "../features/home/pages/HomePage";

export const router = createBrowserRouter([
    {
        element: <HomeLayout></HomeLayout>,
        children: [
            {path: "/home", element: <HomePage/>},
            {path: "/", element: <Navigate to="/home" replace />}
        ]
    },
    {path: "*", element: <Navigate to="/home" replace />}
]);