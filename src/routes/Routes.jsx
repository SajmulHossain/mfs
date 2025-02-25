import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivetRoute from "./PrivetRoute";


const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivetRoute>
        <App />
      </PrivetRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default routes;