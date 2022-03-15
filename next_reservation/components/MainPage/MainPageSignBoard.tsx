const MainPageSignBoard = () => {
  return (
    <div className="bg-black w-full h-800">
      <div className="mx-auto h-full lg:1/2 w-2/3 bg-mainImage-camping bg-no-repeat bg-cover bg-center flex items-end p-10">
        <div className="w-full bottom-10 left-5">
          <span className="inline-block text-emerald text-6xl md:text-8xl text-shadow-xl">
            YASUMI
          </span>
          <span className="inline-block text-3xl md:text-7xl text-shadow-xl">와 함께</span>
          <span className="block text-3xl md:text-5xl text-shadow-xl">
            몸과 마음의 쉴 곳을 찾아요.
          </span>
        </div>
      </div>
    </div>
  );
};

export default MainPageSignBoard;
