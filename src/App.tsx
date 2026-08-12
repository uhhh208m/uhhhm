/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Schedule from './components/Schedule';
import Chat from './components/Chat';
import LoadingScreen from './components/LoadingScreen';
import NotFound from './components/NotFound';
import { AnimationProvider } from './context/AnimationContext';
import { LanguageProvider } from './context/LanguageContext';
import GlobalEffects from './components/GlobalEffects';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <LanguageProvider>
      <AnimationProvider>
        <BrowserRouter>
          <div className="bg-zinc-950 min-h-screen selection:bg-cyan-400 selection:text-white relative">
            <GlobalEffects />
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
            
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Hero />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="chat" element={<Chat />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      </AnimationProvider>
    </LanguageProvider>
  );
}
