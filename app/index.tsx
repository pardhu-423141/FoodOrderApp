// index.tsx
import React, { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen'; // Import the dashboard screen

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Show splash for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update state when login is successful
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  if (isLoggedIn) {
    return <DashboardScreen />;
  }

  return <LoginScreen onLoginSuccess={handleLoginSuccess} />;
};

export default App;
