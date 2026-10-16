import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Built-in BroadcastChannel fallback for zero-setup multi-tab/device local real-time sync
const broadcastChannel = typeof window !== 'undefined' && 'BroadcastChannel' in window
  ? new BroadcastChannel('bytepath_realtime_sync')
  : null;

export const broadcastLocalChange = (type, payload) => {
  if (broadcastChannel) {
    try {
      broadcastChannel.postMessage({ type, payload, timestamp: Date.now() });
    } catch (e) {
      console.warn('BroadcastChannel error:', e);
    }
  }
};

export const subscribeLocalChanges = (onMessage) => {
  if (!broadcastChannel) return () => {};
  const handler = (event) => {
    if (event.data && onMessage) {
      onMessage(event.data);
    }
  };
  broadcastChannel.addEventListener('message', handler);
  return () => broadcastChannel.removeEventListener('message', handler);
};

// Supabase Realtime Channel helper
export const subscribeToSupabaseTable = (table, onRealtimeEvent) => {
  if (!supabase) return () => {};

  const channel = supabase
    .channel(`public:${table}`)
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table },
      (payload) => {
        if (onRealtimeEvent) {
          onRealtimeEvent(payload);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};
