import App, { AppProps } from 'next/app';
import withReduxSaga from 'next-redux-saga';
import { wrapper } from '@/store/index';
import { userSignInAndUpActions } from '@/store/userSignInAndUp';
import axios from '@/lib/api';
import Header from '@/components/Header/Header';
import ClientErrorBoundary from '@/components/Error/ClientErrorBoundary';
import cookieParseToArray from '@/lib/utils/cookieParseToArray';

import GlobalStyle from '@/styles/global/globals';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.css';

const app = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <GlobalStyle />
      <ClientErrorBoundary>
        <Header />
        <Component {...pageProps} />
        <div id="root-modal" />
      </ClientErrorBoundary>
    </>
  );
};

app.getInitialProps = wrapper.getInitialAppProps((store) => async (context) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookies = cookieParseToArray(context.ctx.req?.headers.cookie);
  const { logged } = store.getState().user;
  let accessToken = '';
  cookies.forEach((cookie) => {
    if (cookie.key === 'access_token') accessToken = cookie.value;
  });
  try {
    if (!logged && accessToken) {
      axios.defaults.headers.common = {
        Authorization: 'Bearer ' + accessToken,
      };
      const { data } = await axios.get('/api/auth/FirebaseGetUser');
      store.dispatch(userSignInAndUpActions.userSignInOrUpSuccess(data));
      store.dispatch(userSignInAndUpActions.setLogeed(true));
    }
  } catch (error: any) {
    console.log(error.message);
  }
  return { ...appInitialProps };
});

export default wrapper.withRedux(withReduxSaga(app));
