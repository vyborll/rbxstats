import Router from 'next/router';
import Head from 'next/head';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

import '../../styles/globals.css';
import 'nprogress/nprogress.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>RBXStats</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
