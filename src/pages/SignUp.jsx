import { Meteors } from '@/components/ui/meteor';
import defaultUser from '../assets/users.webp';
import logo from '../assets/logo.png';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = ({signIn}) => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState('');
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  const loadImage = (e) => {
    const image = e.target.files[0];
    setFile(image);
    setPreview(URL.createObjectURL(image));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('file', file);
    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData ,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      const data = await res.data
      setAuthUser(data);
      signIn();
      localStorage.setItem('users', JSON.stringify(data));
      toast.success('Account created successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-background w-full min-h-screen flex items-center justify-center flex-col overflow-x-hidden py-4 mb-24">
      <img className="w-24 h-24 mb-4" src={logo} alt="logo" />
      <div className="relative bg-black/20 dark:bg-white/20 p-6 min-w-[350px] rounded-lg backdrop-blur-lg backdrop-filter">
        <Meteors />
        <div className="mb-5">
          <h1 className="text-center text-3xl font-semibold dark:text-gray-300">
            Sign Up
          </h1>
          <p className="text-center dark:text-gray-300">
            Selamat datang <br /> di UMKM DIGITAL BLOCKCHAIN
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex justify-around items-center">
            <img
              className="w-24 h-24 object-cover rounded-full"
              src={preview ? preview : defaultUser}
              alt="logo"
            />
            <label
              htmlFor="images"
              className="relative flex items-center h-8 px-2 py-1 border-1 border-white rounded-lg bg-yellow-500 text-gray-900 font-semibold ">
              Upload Foto profile
              <input
                id="images"
                name="images"
                className="absolute left-0 w-full h-8 rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 opacity-0 cursor-pointer"
                type="file"
                onChange={loadImage}
              />
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="fullname" className="dark:text-gray-300">
              Fullname
            </label>
            <input
              disabled={loading}
              id="fullname"
              name="fullname"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="text"
              placeholder="Enter your fullname"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="dark:text-gray-300">
              Username
            </label>
            <input
              disabled={loading}
              id="username"
              name="username"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="text"
              placeholder="Enter your Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="dark:text-gray-300">
              Email
            </label>
            <input
              disabled={loading}
              id="email"
              name="email"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="dark:text-gray-300">
              Phone Number
            </label>
            <input
              disabled={loading}
              id="phone"
              name="phone"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="text"
              placeholder="Enter your Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="address" className="dark:text-gray-300">
              Address
            </label>
            <textarea
              disabled={loading}
              id="address"
              name="address"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="text"
              placeholder="Enter your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="dark:text-gray-300">
              Password
            </label>
            <input
              disabled={loading}
              id="password"
              name="password"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="Confirmpassword" className="dark:text-gray-300">
              Confirm Password
            </label>
            <input
              disabled={loading}
              id="Confirmpassword"
              name="Confirmpassword"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="password"
              placeholder="Enter your Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button
            disabled={loading}
            variant="outline"
            type="submit"
            className="w-full bg-indigo-700 mt-4 text-gray-300">
            {loading ? 'Loading...' : 'Register'}
          </Button>
          <p className="dark:text-gray-300">
            Already have an account?{' '}
            <Link className="dark:text-yellow-500 text-indigo-700" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
