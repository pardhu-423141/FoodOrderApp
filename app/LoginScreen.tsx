import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  Button,
  StyleSheet,
  View
} from 'react-native';
import { supabase } from '../lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '702215527180-nhjtfq6hv09v65n2lf912ll4n1sfr91f.apps.googleusercontent.com',
    redirectUri: makeRedirectUri(),
    responseType: 'id_token',
    scopes: ['openid', 'profile', 'email'],
  });

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Animate logo fade in first
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      // After logo fade in completes, animate button fade + scale
      Animated.parallel([
        Animated.timing(buttonOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.spring(buttonScale, {
          toValue: 1,
          friction: 4,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  useEffect(() => {
    if (response?.type === 'success') {
      const idToken = response.params?.id_token;

      if (!idToken) {
        console.warn('No ID token found');
        Alert.alert('Login failed', 'Missing ID token from Google.');
        return;
      }

      const signIn = async () => {
        const { data,error } = await supabase.auth.signInWithIdToken({
          provider: 'google',
          token: idToken,
        });

        const userEmail = data.user?.email;

        if (error) {
          console.error('Supabase sign-in error:', error.message);
          Alert.alert('Login failed', error.message);
        } else if(userEmail === 'messfoodnitap@gmail.com'){
          console.log('Admin login successful');
          router.replace('/adminDashboard');
        }
        else {
          console.log('Login successful');
          router.replace('/DashboardScreen');
        }
      };

      signIn();
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7541/7541708.png' }}
        style={[styles.logo, { opacity: logoOpacity }]}
        resizeMode="contain"
      />
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            opacity: buttonOpacity,
            transform: [{ scale: buttonScale }],
          },
        ]}
      >
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => promptAsync()}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 40,
  },
  buttonContainer: {
    width: '100%',
  },
});
