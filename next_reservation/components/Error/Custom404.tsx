import { useRouter } from 'next/router';

const Custom404 = () => {
  const router = useRouter();
  const clickGotoHomepage = () => router.push('/');
  return (
    <div className="text-black w-1/3 h-300 mx-auto flex flex-col space-y-10 justify-center items-center">
      <h1 className="text-3xl">404 Not Found</h1>
      <h2 className="text-3xl">페이지를 찾을 수 없습니다.</h2>
      <button
        type="button"
        className="w-52 mr-8 rounded-full py-3 px-3 header-sign-in-btn bg-emerald text-white text-xl"
        onClick={clickGotoHomepage}
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default Custom404;
