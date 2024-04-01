import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import logo from "@/assets/logo.png"

const News = () => {
  const navigate = useNavigate()
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
      <img className='w-20 h-20' src={logo} alt="logo"/>
      <h1 className='text-3xl font-bold'>Coming Soon</h1>
      <Button onClick={() => navigate("/") }>Kembali</Button>
    </div>
  )
}

export default News