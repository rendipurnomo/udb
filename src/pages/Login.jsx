import { Meteors } from '@/components/ui/meteor';
import logo from '../assets/logo.png';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import useLogin from '@/hooks/useLogin'

const Login = ({signIn}) => {
  const [input, setInput] = useState({
    username: '',
    password: ''
  });

  const { login, loading } = useLogin()

  const handleSubmit = async(e) => {
    e.preventDefault()
    await login(input)
    signIn()
  }
  return (
    <div className="bg-background w-full min-h-screen flex items-center justify-center flex-col overflow-x-hidden mb-20">
      <img className="w-24 h-24 mb-4" src={logo} alt="logo" />
      <div className="relative bg-black/20 dark:bg-white/20 p-6 min-w-[350px] rounded-lg backdrop-blur-lg backdrop-filter">
        <Meteors />
        <div className="mb-5">
          <h1 className="text-center text-3xl font-semibold dark:text-gray-300">
            Login
          </h1>
          <p className="text-center text-gray-300">
            Selamat datang <br /> di UMKM DIGITAL BLOCKCHAIN
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="dark:text-gray-300">Username</label>
            <input
              disabled={loading}
              id="username"
              name="username"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="text"
              placeholder="Enter your Username"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-300">Password</label>
            <input
              disabled={loading}
              id="password"
              name="password"
              autoComplete="off"
              className="rounded-md py-1 px-2 ring-1 ring-indigo-700 outline-none focus:outline-1 focus:outline-indigo-700 text-gray-900"
              type="password"
              placeholder="Enter your Password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </div>

          <Button disabled={loading} variant="outline" type="submit" className="w-full bg-indigo-700 mt-4 text-gray-300">{loading ? 'Loading...' : 'Login'}</Button>
          <p className='dark:text-gray-300'>Don't have an account? <Link disabled={loading} className='dark:text-yellow-500 text-indigo-700' to="/signup">Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
