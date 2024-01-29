import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContainer from "../../context/AuthContainer";
import ArticlePage from "../../pages/ArticlePage";
import LoginPage from "../../pages/LoginPage";
import UserPage from "../../pages/UserPage";
import AppLayout from "./AppLayout";

const AppRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthContainer>
          <AppLayout />
        </AuthContainer>
      ),
      children: [
        {
          path: "/",
          element: (
            <AuthContainer>
              <ArticlePage />
            </AuthContainer>
          ),
        },
        {
          path: "/login",
          element: (
            <AuthContainer>
              <LoginPage />
            </AuthContainer>
          ),
        },
        {
          path: "/users",
          element: (
            <AuthContainer>
              <UserPage />
            </AuthContainer>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
