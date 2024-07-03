import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import "./globals.css"
import "./styles/main.scss";
import "./styles/secondary.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const container = document.getElementById('root');
const root = createRoot(container!); // The exclamation mark is a non-null assertion
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
