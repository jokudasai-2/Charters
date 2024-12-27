import { useEffect } from 'react';
import { supabase } from '../supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface SubscriptionConfig {
  table: string;
  schema?: string;
  filter?: string;
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
}

export function useRealtimeSubscription(
  config: SubscriptionConfig,
  callback: (payload: any) => void
) {
  useEffect(() => {
    let channel: RealtimeChannel;

    try {
      channel = supabase.channel(`${config.table}_changes`)
        .on(
          'postgres_changes',
          {
            event: config.event || '*',
            schema: config.schema || 'public',
            table: config.table,
            filter: config.filter,
          },
          callback
        )
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.debug(`Subscribed to ${config.table} changes`);
          }
          if (status === 'CHANNEL_ERROR') {
            console.error(`Error subscribing to ${config.table} changes`);
          }
        });
    } catch (error) {
      console.error('Error setting up realtime subscription:', error);
    }

    return () => {
      if (channel) {
        channel.unsubscribe().catch(console.error);
      }
    };
  }, [config.table, config.schema, config.filter, config.event]);
}