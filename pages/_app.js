import Layout from '../components/layout/layout'
import '../styles/globals.css'
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
  <Layout> 
    <Head>
    <title>Eventos NextJS</title>
    <meta name="description" content="Encuentre una gran cantidad de eventos NextJs..." />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <Component {...pageProps} />
  </Layout> 
  );
  }
  
export default MyApp;
