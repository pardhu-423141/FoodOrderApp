import * as Google from 'expo-auth-session/providers/google';
import { makeRedirectUri } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { useEffect } from 'react';
import { Button, Alert } from 'react-native';
import { useRouter } from 'expo-router';
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

useEffect(() => {
  if (response?.type === 'success') {
    const idToken = response.params?.id_token;

    if (!idToken) {
      console.warn('No ID token found');
      Alert.alert('Login failed', 'Missing ID token from Google.');
      return;
    }

    const signIn = async () => {
      const { error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        console.error('Supabase sign-in error:', error.message);
        Alert.alert('Login failed', error.message);
      } else {
        console.log('Login successful');
        router.replace('/DashboardScreen');
      }
    };

    signIn();
  }
}, [response]);



  return (
    <Button
      title="Sign in with Google"
      disabled={!request}
      onPress={() => promptAsync()} 
    />
  );
}
