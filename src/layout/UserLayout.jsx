import { Outlet } from "react-router-dom";
import CommonLayout from "./CommonLayout";


const UserLayout = () => {
  return (
    <section className="layout">
      <CommonLayout />

      <section className="px-4">
        <Outlet />
      </section>
    </section>
  );
};

export default UserLayout;