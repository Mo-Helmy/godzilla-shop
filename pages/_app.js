import {
  colors,
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from '@mui/material';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import { createContext, useMemo, useState } from 'react';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store';
import Layout from '../components/layout/Layout';

export const ColorModeCtx = createContext({
  toggleColorMode: () => {},
  setColorMode: (mode) => {},
});

export default function App({ Component, pageProps }) {
  const preferDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const colorModeInitialState = preferDarkMode ? 'dark' : 'light';
  const [mode, setMode] = useState(colorModeInitialState);

  const toggleColorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')),
    }),
    []
  );

  const setColorMode = useMemo(
    () => ({
      setColorMode: (mode) => setMode(mode),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: colors.red,
                secondary: { main: colors.cyan[800] },
                background: { default: '#f9f9f9', paper: '#e9e9e9' },
              }
            : {
                background: { default: '#2f2f2f', paper: '#3f3f3f' },
                primary: {
                  main: colors.cyan[800],
                  // main: '#31708A',
                  // main: colors.blue[600],
                },
                secondary: {
                  main: colors.blue[300],
                  // main: colors.purple[600],
                },
              }),
        },
      }),
    [mode]
  );

  return (
    <>
      <Head>
        <title>Godzilla</title>
        <meta name="description" content="T-shirt Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ColorModeCtx.Provider
        value={{
          toggleColorMode: toggleColorMode.toggleColorMode,
          setColorMode: setColorMode.setColorMode,
        }}
      >
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <SessionProvider
              session={pageProps.session}
              refetchInterval={60 * 15}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </Provider>
        </ThemeProvider>
      </ColorModeCtx.Provider>
    </>
  );
}
