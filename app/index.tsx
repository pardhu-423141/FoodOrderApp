// index.tsx
import React, { useEffect, useState } from 'react';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import DashboardScreen from './DashboardScreen'; // Import the dashboard screen
import SignUpScreen from './SignUpScreen';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isTryingToSignUp,setShowingSignup]=useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // Show splash for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update state when login is successful
  };
  const handleSignupSuccess=()=>{
    setShowingSignup(true);
  }


  if (showSplash) {
    return <SplashScreen />;
  }

  if (isLoggedIn) {
    return <DashboardScreen />;
  }
  if(isTryingToSignUp){
    return <SignUpScreen />;
  }


  return <LoginScreen onLoginSuccess={handleLoginSuccess} onSignUpSuccess={handleSignupSuccess} />;
};

export default App;
