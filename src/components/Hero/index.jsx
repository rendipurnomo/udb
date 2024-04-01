import { Button } from '@/components/ui/button';
import Cube from '@/components/Cube';

const Hero = () => {
  return (
    <div className="relative h-[20vh] md:h-[40vh] bg-gradient-to-r from-primary to-destructive rounded-xl xl:mx-24 shadow-md shadow-gray-400">
      <h1 className="text-center font-semibold absolute top-5 left-5  md:left-16 md:top-10 text-xl md:text-3xl text-white">
        Enjoy Shopping <br/> On Our <br /> Platform
      </h1>
      <div className='absolute right-10 top-0 md:top-5'>
      <Cube/>
      </div>
      <div className="relative h-full w-1/2 border-r-4 border-white/50 rounded-e-full blur">
        <div className="absolute h-full w-1/2 border-r-[8px] md:border-r-[15px] border-white/40 rounded-e-full -right-6 md:-right-16 blur-md" />
      </div>
    </div>
  );
};

export default Hero;
