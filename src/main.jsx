import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { ThemeProvider } from './components/darkmode/theme-provider.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <AuthContextProvider>
              <ThemeProvider defaultTheme="dark" storageKey="theme">
                <App />
              </ThemeProvider>
            </AuthContextProvider>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
