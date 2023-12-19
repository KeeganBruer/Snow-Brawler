import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { GameEngine } from './GameEngine';
import App from "./Webpage"

const root = createRoot(document.getElementById("root"));
root.render(<App />);
