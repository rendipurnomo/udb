import axios from 'axios';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [access, setAccess] = useState(null);
  const auth = localStorage.getItem("users");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if(auth){
      setAuthUser(JSON.parse(auth));
      const getMe = async () => {
        try {
          const res =await axios.get(`${import.meta.env.VITE_API_URL}/api/users/${JSON.parse(auth).id}`);
          const data = await res.data;
          const datas = {
            id: data.id,
            username: data.username,
            email: data.email,
            roles: data.roles,
            picUrl: data.picUrl,
            fullName: data.fullName,
            address: data.address,
            phone: data.phone,
          }
          localStorage.setItem("users", JSON.stringify(datas));
        } catch (error) {
          console.log(error);
        }
      };
      getMe();
    }
  }, []);

  useEffect(() => {
    if(token){
      setAccess(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, access, setAccess }}>
      {children}
    </AuthContext.Provider>
  );
};
