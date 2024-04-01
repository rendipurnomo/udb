import logo from '../../assets/logo.png';

const Splash = () => {
  return (
    <div className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden">
      <img
        className="w-[100px] h-[100px] object-cover animate-bounce duration-[5s]"
        src={logo}
        alt="logo"
      />
      <h1 className="text-xl font-bold text-center">Welcome to <span className="text-primary">UMKM DIGITAL BLOCKCHAIN</span></h1>
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary blur-3xl -right-[300px] -bottom-[350px]  opacity-50" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-destructive blur-3xl -right-[200px] -bottom-[250px]  opacity-50" />
      <div className="absolute w-[500px] h-[500px] rounded-full bg-primary blur-3xl -left-[300px] -bottom-[350px] opacity-50" />
      <div className="absolute w-[300px] h-[300px] rounded-full bg-destructive blur-3xl -left-[200px] -bottom-[250px] opacity-50" />
    </div>
  );
}

export default Splash