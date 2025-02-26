import UserLayout from "./layout/UserLayout";
import AgentLayout from "./layout/AgentLayout";
import AdminLayout from "./layout/AdminLayout";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";
import BlockAgent from "./layout/AgentPages/BlockAgent";
import Disabled from "./pages/Disabled";


const App = () => {
 const { role, isLoading, isDisabled, user } = useAuth();
 useEffect(() => {
  initFlowbite();
 },[])


 if (isLoading) {
   return <Loading />;
 }

 if (isDisabled) {
   return <Disabled />;
 }

 if(role === 'agent' && user?.agentStatus === 'pending') {
  return <BlockAgent />
 }
 
  if(role === 'user') {
    return <UserLayout />
  } else if(role === 'agent') {
    return <AgentLayout />
  } else if(role === 'admin') {
    return <AdminLayout />
  }


};

export default App;