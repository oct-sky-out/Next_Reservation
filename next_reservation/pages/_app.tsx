import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.css';
import GlobalStyle from 'styles/global/globals';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
      <div id="root-modal" />
    </>
  );
}
export default MyApp;
