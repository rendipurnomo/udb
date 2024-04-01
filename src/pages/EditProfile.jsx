import { Meteors } from '@/components/ui/meteor';
import { Button } from '../components/ui/button';
import { useState } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const EditProfile = () => {
    const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const [fullName, setFullName] = useState(authUser.fullName);
  const [username, setUsername] = useState(authUser.username);
  const [phone, setPhone] = useState(authUser.phone);
  const [address, setAddress] = useState(authUser.address);
  const [email, setEmail] = useState(authUser.email);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(authUser.picUrl);

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
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('email', email);
    formData.append('file', file);
    try {
      setLoading(true);
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${id}`, formData ,{
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      const data = await res.data
      setAuthUser(data);
      localStorage.setItem('users', JSON.stringify(data));
      toast.success('User Updated successfully');
      window.location.reload()
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-background w-full min-h-screen flex items-center justify-center flex-col overflow-x-hidden py-4 mb-24">
      <div className="relative bg-black/20 dark:bg-white/20 p-6 min-w-[350px] rounded-lg backdrop-blur-lg backdrop-filter">
        <Button onClick={() => navigate('/profile')}>Kembali</Button>
        <Meteors />
        <div className="mb-5">
          <h1 className="text-center text-3xl font-semibold dark:text-gray-300">
            Edit Profile
          </h1>
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
              disabled
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
              disabled
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

          <Button
            disabled={loading}
            variant="outline"
            type="submit"
            className="w-full bg-indigo-700 mt-4 text-gray-300">
            {loading ? 'Loading...' : 'Save'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
