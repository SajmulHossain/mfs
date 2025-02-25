import { useState } from "react";
import UserLayout from "./layout/UserLayout";
import AgentLayout from "./layout/AgentLayout";
import AdminLayout from "./layout/AdminLayout";


const App = () => {
  const [role, ] = useState('user');
  if(role === 'user') {
    return <UserLayout />
  } else if(role === 'agent') {
    return <AgentLayout />
  } else if(role === 'admin') {
    return <AdminLayout />
  }


};

export default App;