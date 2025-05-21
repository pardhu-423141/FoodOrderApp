import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import SplashScreen from './SplashScreen'; 

export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showSplash && !isLoading) {
      if (user) {
        router.replace('/DashboardScreen');
      } else {
        router.replace('/LoginScreen');
      }
    }
  }, [showSplash, isLoading, user]);

  return (
    <View style={styles.container}>
      {showSplash ? <SplashScreen /> : <ActivityIndicator size="large" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
