import UserLayout from "./layout/UserLayout";
import AgentLayout from "./layout/AgentLayout";
import AdminLayout from "./layout/AdminLayout";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";
import { initFlowbite } from "flowbite";
import { useEffect } from "react";


const App = () => {
 const { role, isLoading, isdisabled } = useAuth();
 useEffect(() => {
  initFlowbite();
 },[])

 if (isLoading) {
   return <Loading />;
 }

 if(isdisabled) {
  return 
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