import { useRouter } from 'next/router';

const Coustom500 = () => {
  const router = useRouter();
  const clickGotoHomepage = () => router.reload();

  return (
    <div className="text-black w-1/3 h-300 mx-auto flex flex-col space-y-10 justify-center items-center">
      <h1 className="text-3xl">500 Server Error</h1>
      <h2 className="text-3xl">서버에 오류가 발생했습니다.</h2>
      <button
        type="button"
        className="w-52 mr-8 rounded-full py-3 px-3 header-sign-in-btn bg-emerald text-white text-xl"
        onClick={clickGotoHomepage}
      >
        새로고침
      </button>
    </div>
  );
};

export default Coustom500;
