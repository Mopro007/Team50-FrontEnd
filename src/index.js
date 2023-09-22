import React from 'react';
import { createRoot } from 'react-dom/client';
import './components/index.css';
import reportWebVitals from './reportWebVitals';
import App from './App.js';
import { Provider } from 'react-redux';
import store from '../src/store/store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <div className="main_container">
        <h1 className='title'>SHIT50</h1>
            <Provider store={store}>
                <App/>
            </Provider>
    </div>);
reportWebVitals();