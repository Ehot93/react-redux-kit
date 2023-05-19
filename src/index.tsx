/**
 Created: Vladislav Dementyev
 Date: 14.05.2023
 Time: 19:42
 */

import React from 'react';
import {createRoot} from "react-dom/client";

import App from './app/App';

const root = createRoot(document.querySelector('#root'));

/**
 * Добавить приложение на страницу
 */
function renderApp() {
    console.log('hi');
    root && root.render(
        <>
            <App/>
        </>
    );
}
renderApp();
