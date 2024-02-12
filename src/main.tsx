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

moment.updateLocale("es", {});
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ChakraProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <App />
        </PersistGate>
      </Provider>
  </ChakraProvider>,
)
