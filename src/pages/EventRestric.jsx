import {Button} from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.png'

const EventRestric = () => {
  const navigate = useNavigate()
  return (
    <div className='h-calc[100vh-150px] flex justify-center items-center flex-col gap-4'>
      <img className='w-20 h-20' src={logo} alt="logo"/>
      <h1 className='text-xl font-semibold text-center'>Maaf Anda Belum Terdaftar Pada Event Ini</h1>
      <Button onClick={() => navigate("/")}>Kembali</Button>
    </div>
  )
}

export default EventRestric