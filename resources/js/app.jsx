

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import Modal from 'react-modal';
import './bootstrap'

import 'leaflet/dist/leaflet.css';
import { PhotoProvider } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import moment from 'moment/moment';
import 'moment/locale/id'

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'PKS JAKUT DASHBOARD';
Modal.setAppElement('#app');
moment.locale("id")
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<PhotoProvider><App {...props} /></PhotoProvider>);
    },
});

InertiaProgress.init({ color: '#4B5563' });
