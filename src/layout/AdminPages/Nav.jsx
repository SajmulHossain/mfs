import { IoMdArrowBack } from "react-icons/io";
import { IoHomeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";


const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="py-4 flex gap-2">
      <button
        onClick={() => navigate(-1)}
        className="btn bg-main p-1 rounded-full text-white"
      >
        <IoMdArrowBack size={20} />
      </button>
      <button
        onClick={() => navigate("/")}
        className="btn bg-main p-1 rounded-full text-white"
      >
        <IoHomeOutline size={20} />
      </button>
    </div>
  );
};

export default Nav;