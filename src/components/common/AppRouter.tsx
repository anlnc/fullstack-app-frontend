import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ArticlePage from "../../pages/ArticlePage";
import LoginPage from "../../pages/LoginPage";
import UserPage from "../../pages/UserPage";
import AppLayout from "./AppLayout";

const AppRouter: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <ArticlePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/users",
          element: <UserPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
