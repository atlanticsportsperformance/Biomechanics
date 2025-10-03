'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Home() {
  const [status, setStatus] = useState<'checking' | 'ok' | 'err'>('checking');
  const [msg, setMsg] = useState<string>('');

  useEffect(() => {
    (async () => {
      try {
        const { error } = await supabase.auth.getSession();
        if (error) {
          setStatus('err');
          setMsg(error.message);
        } else {
          setStatus('ok');
          setMsg('Connected to Supabase ✅');
        }
      } catch (e: any) {
        setStatus('err');
        setMsg(e?.message ?? 'Unknown error');
      }
    })();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: 'system-ui' }}>
      <h1>Biomechanics</h1>
      <p>Status: {status === 'checking' ? 'Checking…' : status === 'ok' ? '✅ OK' : '❌ Error'}</p>
      {msg && <pre style={{ whiteSpace: 'pre-wrap' }}>{msg}</pre>}
    </main>
  );
}
