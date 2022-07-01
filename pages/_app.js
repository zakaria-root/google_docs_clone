import "../styles/globals.css";
import Header from "../components/Header";
import { Provider } from "next-auth/client";
import { AuthUserProvider } from '../components/contexts/authContext'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (

    // <Provider session={pageProps.session}>
    <AuthUserProvider>
      <Header>
        <Component {...pageProps} />
      </Header>
    </AuthUserProvider>

    // </Provider>

  );
}

export default MyApp;
