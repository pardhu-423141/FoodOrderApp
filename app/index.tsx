// index.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import DashboardScreen from './DashboardScreen';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';
import VerifyPage from './Verify';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const splashOpacity = useRef(new Animated.Value(1)).current;
  const loginOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      // Fade out splash first
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
        // Fade in login immediately after splash disappears
        Animated.timing(loginOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <Animated.View style={[styles.container, { opacity: splashOpacity }]}>
        <SplashScreen />
      </Animated.View>
    );
  }

  if (isLoggedIn) return <DashboardScreen />;

  if (isVerifying)
    return <VerifyPage onVerifySuccess={() => setIsLoggedIn(true)} />;

  if (isSigningUp)
    return <SignUpScreen onSignUpComplete={() => setIsVerifying(true)} />;

  return (
    <Animated.View style={[styles.container, { opacity: loginOpacity }]}>
      <LoginScreen
        onCodeSent={() => setIsVerifying(true)}
        onSignUpClick={() => setIsSigningUp(true)}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
