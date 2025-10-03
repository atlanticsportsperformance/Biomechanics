@"
'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

type Status = 'checking' | 'ok' | 'err';

export default function Home() {
  const [status, setStatus] = useState<Status>('checking');
  const [msg, setMsg] = useState('');

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
      } catch (e: unknown) {
        const m = e instanceof Error ? e.message : String(e);
        setStatus('err');
        setMsg(m);
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
"@ | Out-File -Encoding utf8 .\src\app\page.tsx
