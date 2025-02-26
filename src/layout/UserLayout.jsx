import { Outlet } from "react-router-dom";
import CommonLayout from "./CommonLayout";


const UserLayout = () => {
  return (
    <section className="layout hide-scrollbar">
      <CommonLayout />

      <section className="px-4">
        <Outlet />
      </section>
    </section>
  );
};

export default UserLayout;