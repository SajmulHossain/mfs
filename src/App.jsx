import UserLayout from "./layout/UserLayout";
import AgentLayout from "./layout/AgentLayout";
import AdminLayout from "./layout/AdminLayout";
import useAuth from "./hooks/useAuth";


const App = () => {
 const { role } = useAuth();

  if(role === 'user') {
    return <UserLayout />
  } else if(role === 'agent') {
    return <AgentLayout />
  } else if(role === 'admin') {
    return <AdminLayout />
  }


};

export default App;