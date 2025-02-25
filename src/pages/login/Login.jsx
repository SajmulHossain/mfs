import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Login = () => {
  return (
    <section className="layout">
      <div className='my-5'>
        <img src={logo} alt="logo" />
      </div>
      <form className="max-w-sm mx-auto">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email or Phone
          </label>
          <input
            type="email"
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
          type="submit"
          className="text-white bg-second/80 w-full hover:bg-second focus:ring-4 focus:outline-none focus:ring-secondbg-second font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Login
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
