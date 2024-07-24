import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './globals.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { App } from './App';
import './styles/main.scss';
import './styles/secondary.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { ConfigProvider } from 'antd';
import antdTheme from './utils/config/antdConfig';
import './tailwind.css'; // Import Tailwind CSS

const clientId = '702830308593-fnn05bka4scjq5gpria8qv33elohft62.apps.googleusercontent.com';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <ConfigProvider theme={antdTheme}>
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  </ConfigProvider>,
);
