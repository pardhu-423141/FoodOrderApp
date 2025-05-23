// lib/auth.js
import { supabase } from './supabase';

export const signUp = async (email, password, role = 'user') => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role
      }
    }
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};