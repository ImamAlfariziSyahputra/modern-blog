import Head from 'next/head';
import { wrapper } from '@/redux/store/store';
// import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
// import store from '@/redux/store/store';
import { theme } from '../theme';
import DashboardLayout from '../layouts/DashboardLayout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Provider store={store}> */}
      <ThemeProvider theme={theme}>
        <Head>
          <title>Modern Blog CMS</title>
        </Head>
        <DashboardLayout>
          <Component {...pageProps} />
        </DashboardLayout>
      </ThemeProvider>
      {/* </Provider> */}
    </>
  );
}

export default wrapper.withRedux(MyApp);
