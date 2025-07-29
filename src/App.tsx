import React from 'react';
import { PropertyProvider } from './Context/PropertyContext';
import { ThemeProvider } from './Context/ThemeContext';
import Home from './Pages/Home';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <PropertyProvider>
        <Home />
      </PropertyProvider>
    </ThemeProvider>
  );
};

export default App;
