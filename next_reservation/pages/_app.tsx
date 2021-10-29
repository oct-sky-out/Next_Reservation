import { GetServerSideProps } from 'next';
import type { AppProps } from 'next/app';
import { wrapper } from '../store/index';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.css';
import GlobalStyle from '../styles/global/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
}

export default wrapper.withRedux(MyApp);
