import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './config/theme.tsx'
import { Provider } from 'react-redux'
import { persistor, store } from './store/store.ts'
import { PersistGate } from 'redux-persist/integration/react';
import moment from 'moment/min/moment-with-locales';
import 'moment/locale/es';
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "react-error-boundary";
import { MyError } from './components/myError/myError.tsx'

moment.updateLocale("es", {});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ErrorBoundary fallback={<MyError/>}>
            <App />
          </ErrorBoundary>
        </PersistGate>
      </Provider>
    </ChakraProvider>
  </HelmetProvider>,
)