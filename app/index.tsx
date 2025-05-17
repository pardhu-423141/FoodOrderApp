// index.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet } from 'react-native';
import DashboardScreen from './DashboardScreen';
import LoginScreen from './LoginScreen';
import SetPassword from './SetPassword';
import SignUpScreen from './SignUpScreen';
import SplashScreen from './SplashScreen';
import VerifyPage from './Verify';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSet, setIsSetting] = useState(false);
  const [isPasswordSet, setPasswordSet] = useState(false);

  const splashOpacity = useRef(new Animated.Value(1)).current;
  const loginOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowSplash(false);
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
  if (isSet) return <SetPassword onPasswordSet={() => setPasswordSet(true)} />;
  if (isVerifying) return <VerifyPage onVerifySuccess={() => setIsSetting(true)} />;
  if (isSigningUp) return <SignUpScreen onSignUpComplete={() => setIsVerifying(true)} />;
  if (isPasswordSet) return <LoginScreen />;
  return (
    <Animated.View style={[styles.container, { opacity: loginOpacity }]}>
      <LoginScreen
        onCodeSent={() => setIsLoggedIn(true)}
        onSignUpClick={() => setIsSigningUp(true)}
        onSet={() => setIsSetting(true)}
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
