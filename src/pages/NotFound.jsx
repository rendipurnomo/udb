import { useNavigate } from "react-router-dom"
import logo from "../assets/logo.png"

const NotFound = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate("/")
  }
  return (
    <div className='h-[90vh] flex flex-col justify-center items-center px-4 md:px-0'>
      <img className="w-32 h-32" src={logo} alt="logo"/>
      <h1 className='text-3xl font-bold'>Page Not Found</h1>
      <p className='text-3xl'>404</p>
      <button className='bg-red-500 rounded-md px-4 py-2 min-w-[100px] font-semibold text-white hover:bg-red-700 transition-all ease-in-out duration-150' onClick={handleBack}>Back</button>
    </div>
  )
}

export default NotFound