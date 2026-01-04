import { createBrowserRouter, Navigate } from "react-router-dom";
import NavbarLayout from "../layouts/NavbarLayout";
import {
  HomePage,
  ExplorePage,
  ProfilePage,
  LoginPage,
  RegisterPage,
  BookPage,
} from "../pages";
import ProtectedRoute from "./ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "book/:id",
        element: <BookPage />,
      },
      {
        path: "me",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
