import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import HomePage from "../pages/Home";
import ErrorPage from "../pages/Error";
import SignupPage from "../pages/Signup";
import {action as signupAction} from "../pages/Signup"
import LoginPage from "../pages/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "signup",
        element: <SignupPage />,
        action: signupAction
      },
      {
        path: "login",
        element: <LoginPage />,
        // action: signupAction
      },
    ],
  },
]);
