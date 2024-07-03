import { createRoot } from 'react-dom/client';
import React from 'react';
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import "./globals.css"
import "./styles/main.scss";
import "./styles/secondary.css";

const container = document.getElementById('root');
const root = createRoot(container!); // The exclamation mark is a non-null assertion
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
