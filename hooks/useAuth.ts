import { useEffect, useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const userRef = useRef<User | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) console.log('Session error:', error.message);

      const currentUser = session?.user ?? null;
      userRef.current = currentUser;
      setUser(currentUser);
      setIsLoading(false);
    };

    loadSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const newUser = session?.user ?? null;
      if (newUser?.id !== userRef.current?.id) {
        userRef.current = newUser;
        setUser(newUser);
      } else if (!newUser && userRef.current) {
        userRef.current = null;
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, isLoading };
}
