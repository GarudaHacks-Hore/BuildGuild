'use client';

import { supabase } from '@/lib/supabase';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const logOut = async () => {
      let { error } = await supabase.auth.signOut();
      console.log(error);
    };
    logOut();
    router.back();
  }, []);

  return <main></main>;
}
