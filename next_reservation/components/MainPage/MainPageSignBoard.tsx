const MainPageSignBoard = () => {
  return (
    <div className="bg-black w-full h-1000">
      <div className="mx-auto w-1/2 h-800 bg-mainImage-camping bg-no-repeat bg-cover bg-center rounded-3xl relative -bottom-32">
        <div className="absolute w-full bottom-10 left-5">
          <span className="inline-block text-emerald text-8xl text-shadow-xl">
            YASUMI
          </span>
          <span className="inline-block text-7xl text-shadow-xl">와 함께</span>
          <span className="block text-5xl text-shadow-xl">
            몸과 마음의 쉴 곳을 찾아요.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainPageSignBoard;
