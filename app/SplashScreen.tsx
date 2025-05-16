import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const SplashScreen = ({ onAnimationEnd }: { onAnimationEnd?: () => void }) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1.2)).current;

  useEffect(() => {
    // Sequence: Fade-in + zoom-in -> Fade-out + zoom-out (optional)
    Animated.sequence([
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 800,
          delay: 500, // delay before fade out starts
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.8,
          duration: 800,
          delay: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {
      // Trigger callback to indicate splash screen is done
      if (onAnimationEnd) {
        onAnimationEnd();
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7541/7541708.png' }}
        style={[
          styles.logo,
          {
            opacity: opacity,
            transform: [{ scale: scale }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 200,
    height: 200,
  },
});
