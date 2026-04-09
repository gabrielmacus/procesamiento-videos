import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router';
import HomeSection from './sections/home/HomeSection';

const root = createRoot(document.body);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomeSection />} />
        </Routes>
    </BrowserRouter>
);