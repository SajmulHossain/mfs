import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <section className="layout p-4 flex justify-center flex-col items-center">
      <div className="animate-pulse">
        <h3 className="font-semibold text-2xl italic">404 Page Not Found</h3>
      </div>
        <div className="flex gap-2 mt-4">
          <button onClick={() => navigate('/')} className="btn border border-main bg-second text-white px-3 py-2 rounded-md">Goto Home</button>
          <button onClick={() => navigate(-1)} className="btn border border-second bg-main text-white px-3 py-2 rounded-md">Go Back</button>
        </div>
    </section>
  );
};

export default ErrorPage;