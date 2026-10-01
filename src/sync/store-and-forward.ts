import { EdgeEvent } from "../domain/edge-event";

export interface EdgeStore {
  getPending(limit: number): Promise<EdgeEvent[]>;
  markAcknowledged(eventIds: string[]): Promise<void>;
}

export interface CloudTransport {
  send(events: EdgeEvent[]): Promise<{ acceptedEventIds: string[] }>;
}

export async function syncPendingEvents(
  store: EdgeStore,
  transport: CloudTransport,
  batchSize = 100
): Promise<number> {
  const pending = await store.getPending(batchSize);

  if (pending.length === 0) {
    return 0;
  }

  const response = await transport.send(pending);

  if (response.acceptedEventIds.length > 0) {
    await store.markAcknowledged(response.acceptedEventIds);
  }

  return response.acceptedEventIds.length;
}
