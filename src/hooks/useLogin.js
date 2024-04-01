import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputError({ username, password });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!username || !password) {
        toast.error('Please fill in all fields');
        return;
      }

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      if(res.ok){
        toast.success('Login Successful')
        localStorage.setItem('users', JSON.stringify(data));
        //context
        setAuthUser(data);
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

function handleInputError({ username, password }) {
  if (!username || !password) {
    toast.error('Please fill in all fields');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }
  return true;
}