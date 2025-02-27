import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PrivetRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import Users from "../layout/AdminPages/Users";
import Home from "../pages/Home";
import AgentRequest from "../layout/AdminPages/AgentRequest";
import CashIn from "../layout/AgentPages/CashIn";
import AgentRoute from "./AgentRoute";
import Cashout from "../layout/UserPages/Cashout";
import Transaction from "../layout/Transaction";
import UserDetails from "../layout/AdminPages/UserDetails";
import RequestMoney from "../layout/AgentPages/RequestMoney";
import Withdraw from "../layout/AgentPages/Withdraw";
import WithdrawRequest from "../layout/AdminPages/WithdrawRequest";
import MoneyRequest from "../layout/AdminPages/MoneyRequest";


const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivetRoute>
        <App />
      </PrivetRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: (
          <AdminRoute>
            <Users />
          </AdminRoute>
        ),
      },
      {
        path: "/agent-requests",
        element: (
          <AdminRoute>
            <AgentRequest />
          </AdminRoute>
        ),
      },
      {
        path: "/cash-in",
        element: (
          <AgentRoute>
            <CashIn />
          </AgentRoute>
        ),
      },
      {
        path: "/cash-out",
        element: <Cashout />,
      },
      {
        path: "/transactions",
        element: <Transaction />,
      },
      {
        path: '/money-requests',
        element: <AdminRoute>
          <MoneyRequest />
        </AdminRoute>
      },
      {
        path: "/user/details/:number",
        element: (
          <AdminRoute>
            <UserDetails />
          </AdminRoute>
        ),
      },
      {
        path: "/request-money",
        element: (
          <AgentRoute>
            <RequestMoney />
          </AgentRoute>
        ),
      },
      {
        path: "/withdraws",
        element: (
          <AgentRoute>
            <Withdraw />
          </AgentRoute>
        ),
      },
      {
        path: '/withdraw-requests',
        element: <AdminRoute>
          <WithdrawRequest />
        </AdminRoute>
      }
    ],
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
