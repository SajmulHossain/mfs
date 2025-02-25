import UserLayout from "./layout/UserLayout";
import AgentLayout from "./layout/AgentLayout";
import AdminLayout from "./layout/AdminLayout";
import useAuth from "./hooks/useAuth";
import Loading from "./components/Loading";


const App = () => {
 const { role, loading } = useAuth();

 if(loading) {
  return <Loading />
 }
console.log(role);
  if(role === 'user') {
    return <UserLayout />
  } else if(role === 'agent') {
    return <AgentLayout />
  } else if(role === 'admin') {
    console.log('admin paice');
    return <AdminLayout />
  }


};

export default App;