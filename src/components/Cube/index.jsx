import './cube.css';

const Cube = () => {
  return (
    <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] relative">
      <div className="absolute left-0 right-0 w-full h-full cube">
        <div className="absolute left-0 right-0 w-full h-full top"></div>
        <span className="absolute left-0 right-0 w-full h-full cube_span cube1"></span>
        <span className="absolute left-0 right-0 w-full h-full cube_span cube2"></span>
        <span className="absolute left-0 right-0 w-full h-full cube_span cube3"></span>
        <span className="absolute left-0 right-0 w-full h-full cube_span cube4"></span>
      </div>
    </div>
  );
};

export default Cube;
