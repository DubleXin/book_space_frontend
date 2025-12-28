import { createBrowserRouter, Navigate } from "react-router-dom";
import NavbarLayout from "../layouts/NavbarLayout";
import { HomePage, ServerlessTestPage, ExplorePage } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "../pages/Login";
import RegisterPage from "../pages/Register";
import ProfilePage from "../pages/ProfilePage";
import Book from "../pages/BookPage";

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
        path: "serverless",
        element: <ServerlessTestPage />,
      },
      {
        path: "book/:id",
        element: <Book />,
      },
      {
        path: "me",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
]);
