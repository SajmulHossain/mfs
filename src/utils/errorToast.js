import toast from "react-hot-toast";

const error = message => {
  toast.error(message || "Something Went Wrong!");
}

export default error;