import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { useMutation } from '@tanstack/react-query';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import error from '../../utils/errorToast';
import Loading from '../../components/Loading';

const Register = () => {
  const navigate = useNavigate();
  const {mutateAsync, isPending} = useMutation({
    mutationKey: ['user'],
    mutationFn: async userData => {
      const {data} = await axiosSecure.post('/users', userData);
      if(data?.success) {
        toast.success('Registration Successful!');
      } else {
        error();
      }
    }
  })


  const handleRegistration = async e => {
    e.preventDefault();

    const form = e.target;
    
    const name = form.name.value;
    const pin = form.pin.value;
    const number = form.number.value;
    const email = form.email.value;
    const role = form.role.value;
    const nid = form.nid.value;

    if(!name || !pin || !number || !email || !nid) {
      return error('You must fill all field properly');
    }

    if(isNaN(pin) || pin.length !== 5) {
      return error('PIN must be 5 digits number!');
    }

    if(isNaN(number) || number.length !== 11) {
      return error('Mobile Number should 11 digit number');
    }

    if(isNaN(nid)) {
      return error('NID should be numbered input');
    }





    const data = {
      name, pin, number, email, role, nid,
    }

    try {
      await mutateAsync(data);
      form.reset();
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <section className="layout">
      <div>
        <img src={logo} className="h-28 mx-auto" alt="logo" />
      </div>
      <form onSubmit={handleRegistration} className="max-w-sm mx-auto">
        <div className="mb-4">
          <input
            type="text"
            id="name"
            name="name"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-second focus:border-secring-second block w-full p-2.5"
            placeholder="Your Name"
            required
          />
        </div>

        {/* pin */}
        <div className="mb-4">
          {/* <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your PIN
          </label> */}
          <input
            type="password"
            name="pin"
            placeholder="PIN"
            maxLength={5}
            id="password"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-second focus:border-sering-second block w-full p-2.5"
            required
          />
        </div>

        {/* number */}
        <div className="mb-4">
          {/* <label
            htmlFor="number"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your Mobile Number
          </label> */}
          <input
            type="tel"
            id="number"
            name="number"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-second focus:border-secring-second block w-full p-2.5"
            placeholder="Mobile Number"
            required
          />
        </div>

        {/* email */}
        <div className="mb-4">
          {/* <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label> */}
          <input
            type="email"
            id="email"
            name="email"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-second focus:border-secring-second block w-full p-2.5"
            placeholder="Email"
            required
          />
        </div>

        {/* user type */}
        <div className="mb-4">
          {/* <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select your country
          </label> */}
          <select
            name='role'
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-second focus:border-secondring-second block w-full p-2.5"
          >
            <option value="user">User</option>
            <option value="agent">Agent</option>
          </select>
        </div>

        {/* nid */}
        <div className="mb-4">
          <input
            type="number"
            id="nid"
            name="nid"
            className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-second focus:border-secring-second block w-full p-2.5"
            placeholder="NID Number"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="btn text-white bg-second/90 cursor-pointer w-full hover:bg-second focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Register new account {isPending && <Loading crud={true} />}
        </button>

        <div className='mt-3 text-center text-sm font-medium'>
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Register;