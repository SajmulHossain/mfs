import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import error from '../../utils/errorToast';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import Loading from '../../components/Loading';

const Login = () => {
  const {setUser, setRole} = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['user'],
    mutationFn: async(userData) => {
      const { data } = await axiosSecure.post("/jwt", userData);
      if (data?.success) {
        toast.success("Login Successful!");
        const role = data?.role;
        setRole(role);
        setUser(data?.user);
        navigate("/");
      } else {
        error();
      }

    }
  })


  const handleLogin = async e => {
    e.preventDefault();

    const form = e.target;
    const auths = form.auths.value;
    const pin = form.pin.value;
    
    if(!auths || !pin) {
      return error('You must fill all field');
    }

    const authData = {auths, pin}

    try {
     await mutateAsync(authData)
    } catch (err) {
      error(err.message)
      console.log(err);
    }


  }
  return (
    <section className="layout">
      <div className='my-5'>
        <img src={logo} alt="logo" />
      </div>
      <form onSubmit={handleLogin} className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email or Phone
          </label>
          <input
            type="text"
            id="email"
            name="auths"
            className="shadow-xs bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-second focus:border-secondring-second block w-full p-2.5"
            placeholder="Mobile Number or Email"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            PIN
          </label>
          <input
            type="password"
            id="password"
            placeholder="PIN"
            name="pin"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
        disabled={isPending}
          type="submit"
          className="btn text-white bg-second/80 w-full hover:bg-second focus:ring-4 focus:outline-none focus:ring-secondbg-second font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login {isPending && <Loading crud={true} />}
        </button>

        <div className='mt-4 text-sm text-center font-medium'>
          <p>
            {`Don't have an account?`}{" "}
            <Link
              to='/register'
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
