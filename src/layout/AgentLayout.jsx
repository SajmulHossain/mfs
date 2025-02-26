import { Outlet } from "react-router-dom";
import CommonLayout from "./CommonLayout";


const AgentLayout = () => {
  return (
    <section className="layout hide-scrollbar">
      <CommonLayout />

      <section className="px-4">
        <Outlet />
      </section>
    </section>
  );
};

export default AgentLayout;