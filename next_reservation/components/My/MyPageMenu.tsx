import { useRouter } from 'next/router';
import Link from 'next/link';

const MyPageMenu = () => {
  const router = useRouter();

  const paintingTextColor = () => router.pathname === '/my/account';

  return (
    <>
      <Link href="/my/account">
        <a
          className={`inline-block text-2xl ${
            paintingTextColor() && 'text-emerald'
          } hover:text-emerald`}
        >
          계정 정보수정
        </a>
      </Link>
      <Link href="/my/reservations">
        <a
          className={`inline-block text-2xl ${
            !paintingTextColor() && 'text-emerald'
          } hover:text-emerald`}
        >
          내 예약정보
        </a>
      </Link>
    </>
  );
};

export default MyPageMenu;
