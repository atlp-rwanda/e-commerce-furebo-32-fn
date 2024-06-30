import { createRoot } from 'react-dom/client';
import {App} from './App';

const container = document.getElementById('root');
const root = createRoot(container!); // The exclamation mark is a non-null assertion
root.render(<App />);
