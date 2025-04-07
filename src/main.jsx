import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Subscriptions from "./pages/Subscriptions";
import YourVideos from "./pages/YourVideos";
import LikedVideos from "./pages/LikedVideos";
import AuthLayout from "./components/AuthLayout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { Provider } from "react-redux";
import store from "./store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <AuthLayout authentication={false}>
            <Home />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/subscriptions",
        element: (
          <AuthLayout authentication>
            <Subscriptions />
          </AuthLayout>
        ),
      },
      {
        path: "/your-videos",
        element: (
          <AuthLayout authentication>
            <YourVideos />
          </AuthLayout>
        ),
      },
      {
        path: "/liked-videos",
        element: (
          <AuthLayout authentication={false}>
            {" "}
            <LikedVideos />
          </AuthLayout>
        ),
      },
      {
        path: "/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/signup",
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
