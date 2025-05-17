import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, StyleSheet } from 'react-native';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';

const AppEntry = () => {
  const [showLogin, setShowLogin] = useState(false);

  const splashAnim = useRef(new Animated.Value(1)).current;
  const loginAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(splashAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(loginAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start(() => setShowLogin(true));
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {!showLogin && (
        <Animated.View style={[StyleSheet.absoluteFill, { opacity: splashAnim }]}>
          <SplashScreen />
        </Animated.View>
      )}
      <Animated.View style={[StyleSheet.absoluteFill, { opacity: loginAnim }]}>
        <LoginScreen />
      </Animated.View>
    </View>
  );
};

export default AppEntry;
