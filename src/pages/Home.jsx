import useAuth from "../hooks/useAuth";
import AdminHome from "../layout/AdminPages/AdminHome";
import AgentHome from "../layout/AgentPages/AgentHome";
import UserHome from "../layout/UserPages/UserHome";


const Home = () => {
  const {role} = useAuth();
  
  if(role === 'admin') {
    return <AdminHome />
  } else if(role === 'agent') {
    return <AgentHome />
  } else if(role === 'user') {
    return <UserHome />
  }
};

export default Home;