import useAuth from "../../hooks/useAuth";


const BlockAgent = () => {
  const { user } = useAuth();
  return (
    <section className="layout">
      {user?.agentStatus === "pending" ? (
        <div>
          <p className="text-center font-semibold text-2xl mt-10 text-second">
            Your agent request is pending. Please wait for Admin apporval.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-center font-semibold text-2xl mt-10 text-red-700">
            Your agent request has been denied by Admin. Please try contact with
            Admin
          </p>
        </div>
      )}
    </section>
  );
};

export default BlockAgent;