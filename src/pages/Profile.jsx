import { User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Button } from '@/components/ui/button';
import { useAuthContext } from '../context/AuthContext';
import { Mail } from 'lucide-react';
import { LocateIcon } from 'lucide-react';
import { Phone } from 'lucide-react';
import { Trophy } from 'lucide-react';
import { User2 } from 'lucide-react';
import { LogOut } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, selectAllOrders } from '../features/orders/orderSlice';

const Profile = () => {
  const { authUser, setAuthUser,setAccess } = useAuthContext();
  const { id,fullName, username, email, picUrl, address, phone, roles } =
    authUser;
  const dispatch = useDispatch();
  const ordersList = useSelector(selectAllOrders);
  const navigate = useNavigate();
  if(!authUser){
    navigate('/login')
  }

  const handleLogout = () => {
    try {
      axios.post(`${import.meta.env.VITE_API_URL}/api/auth/logout`);
      localStorage.removeItem('users');
      setAuthUser(null);
      localStorage.removeItem('token');
      setAccess(null)
      toast.success('Logout success');
      window.location.reload();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatter = new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  useEffect(() => {
    dispatch(getOrders());
  },[ dispatch ]);
  const orders = ordersList?.filter(order => order.username.toLowerCase() === username.toLowerCase());  
  const deliveryFalse = orders?.filter(order => order.delivery === false);
  const deliveryTrue = orders?.filter(order => order.delivery === true);

  console.log(picUrl)
  return (
    <div className="flex flex-col">
      <div className="flex justify-end">
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-700 p-2 rounded-full text-white font-semibold">
          <LogOut className="w-6 h-6" />
          <h1>Logout</h1>
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-5 text-center">Profile</h1>
      <div className="flex justify-center">
        <img
          className="w-20 h-20 rounded-full mb-5 object-cover"
          src={picUrl}
          alt={fullName}
        />
      </div>
      <Button onClick={() => navigate(`/profile/${id}`)} className="bg-primary mb-4">Edit Profile</Button>
      <table className="flex justify-between border-2 p-4 rounded-lg bg-black/90 dark:bg-white/20 backdrop-filter mb-5 text-xs text-white">
        <thead className="flex-1">
          <tr className="flex flex-col items-start gap-2">
            <td className="flex items-center gap-1">
              <User className="w-6 h-6" />
              Fullname
            </td>
            <td className="flex items-center gap-1">
              <User2 className="w-6 h-6 text-indigo-500" /> Username
            </td>
            <td className="flex items-center gap-1">
              <Mail className="w-6 h-6 text-blue-500" /> Email
            </td>
            <td className="flex items-center gap-1">
              <Phone className="w-6 h-6 text-lime-500" /> Phone
            </td>
            <td className="h-40 flex items-start gap-1">
              <LocateIcon className="w-6 h-6 text-red-500" /> Address
            </td>
            <td className="flex items-center gap-1">
              <Trophy className="w-6 h-6 text-yellow-500" /> Status
            </td>
          </tr>
        </thead>
        <tbody className="flex-1">
          <tr className="flex flex-col items-end gap-2">
            <td className='h-7 flex items-center'>{fullName}</td>
            <td className="h-6 flex items-center">{username}</td>
            <td className="h-6 flex items-center">{email}</td>
            <td className="h-6 flex items-center">{phone}</td>
            <td className="h-40 flex-wrap">{address}</td>
            <td className='h-7 flex items-center'>{roles}</td>
          </tr>
        </tbody>
      </table>
      <h1 className="text-xl font-bold mb-5 text-center">Riwayat Order</h1>
      <div className="mb-24">
        {orders.length > 0 ? (
          <div className="flex flex-col gap-4">
            <h1 className="text-center">
              Kamu mempunyai{' '}
              <span className="font-bold dark:text-yellow-500">
                {orders.length}
              </span>{' '}
              riwayat order
            </h1>
            <div className="flex justify-center text-xs">
              <Tabs defaultValue="dikirim" className="w-full text-center">
                <TabsList>
                  <TabsTrigger value="dikirim">
                    Dikirim <span>({deliveryFalse.length})</span>
                  </TabsTrigger>
                  <TabsTrigger value="selesai">
                    Pesanan Selesai <span>({deliveryTrue.length})</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="dikirim">
                  <table
                    className="flex justify-between border-2 pb-4 rounded-lg bg-black/90 dark:bg-white/20 backdrop-filter mb-5 flex-wrap text-white text-xs">
                    <thead className="w-full">
                      <tr className="w-full flex justify-between items-center bg-yellow-700 py-2 rounded-t-md">
                        <td className="w-1/6">Tanggal</td>
                        <td className="w-3/6">Nama Barang</td>
                        <td className="w-1/6">Jumlah</td>
                        <td className="w-1/6">Total Harga</td>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {deliveryFalse.map((item) => (
                        <tr key={item.id} className="w-full flex justify-between even:bg-black/80 py-2 even:rounded-md">
                          <td className="w-1/6">{formatter.format(Date.parse(item.createdAt))}</td>
                          <td className="w-3/6">
                            {item.memo.substring(0, 30)}
                          </td>
                          <td className="w-1/6">{item.quantity}</td>
                          <td className="w-1/6">{item.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </TabsContent>
                <TabsContent value="selesai">
                    <table
                      className="flex justify-between border-2 pb-4 rounded-lg bg-black/90 dark:bg-white/20 backdrop-filter mb-5 flex-wrap text-white">
                      <thead className="w-full">
                        <tr className="w-full flex justify-between bg-green-700 py-2 rounded-t-md items-center">
                          <td className="w-1/6">Tanggal</td>
                          <td className="w-3/6">Nama Barang</td>
                          <td className="w-1/6">Jumlah</td>
                          <td className="w-1/6">Total Harga</td>
                        </tr>
                      </thead>
                      <tbody className="w-full">
                      {deliveryTrue.map((item) => (
                        <tr key={item.id} className="w-full flex justify-between even:bg-black/80 py-2 even:rounded-md">
                          <td className="w-1/6">{formatter.format(Date.parse(item.createdAt))}</td>
                          <td className="w-3/6">
                            {item.memo.substring(0, 20)}
                          </td>
                          <td className="w-1/6">{item.quantity}</td>
                          <td className="w-1/6">{item.totalPrice}</td>
                        </tr>
                      ))}
                    </tbody>
                    </table>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        ) : (
          <h1 className="text-center">Belum ada order</h1>
        )}
      </div>
    </div>
  );
};

export default Profile;
