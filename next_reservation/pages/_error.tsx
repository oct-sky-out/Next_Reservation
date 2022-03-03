import { NextPageContext } from 'next';

interface ErrorComponentProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorComponentProps) => {
  return (
    <p>
      {statusCode
        ? `${statusCode} 서버에서 오류가 발생했습니다.`
        : '클라이언트 오류.'}
    </p>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
