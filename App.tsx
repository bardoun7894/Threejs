import React from 'react';
import { LoginPage } from './pages/LoginPage';

const App: React.FC = () => {
  return (
    <div className="antialiased text-white selection:bg-cyber-cyan selection:text-cyber-dark">
       <LoginPage />
    </div>
  );
};

export default App;