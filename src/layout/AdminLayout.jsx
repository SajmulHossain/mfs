import { Outlet } from "react-router-dom";
import CommonLayout from "./CommonLayout";

const AdminLayout = () => {  
  

  return (
    <section className="layout relative hide-scrollbar">
      <CommonLayout />

      {/* main section */}
      <section className="px-4">
        <Outlet />
      </section>
    </section>
  );
};

export default AdminLayout;
