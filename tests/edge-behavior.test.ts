import test from "node:test";
import assert from "node:assert/strict";
import { isDuplicate } from "../src/processing/deduplicate";
import { syncPendingEvents } from "../src/sync/store-and-forward";
import type { EdgeEvent } from "../src/domain/edge-event";

const baseEvent: EdgeEvent = {
  eventId: "evt-1",
  eventType: "device.presence",
  deviceIdentity: "asset-42",
  gatewayId: "gw-1",
  occurredAt: "2026-10-01T12:00:00.000Z",
  observations: 3,
  syncStatus: "pending",
};

test("same device and event inside the window is considered duplicate", () => {
  const candidate: EdgeEvent = {
    ...baseEvent,
    eventId: "evt-2",
    occurredAt: "2026-10-01T12:00:20.000Z",
  };

  assert.equal(isDuplicate(candidate, [baseEvent], 30_000), true);
});

test("same device outside the window is not duplicate", () => {
  const candidate: EdgeEvent = {
    ...baseEvent,
    eventId: "evt-3",
    occurredAt: "2026-10-01T12:01:00.000Z",
  };

  assert.equal(isDuplicate(candidate, [baseEvent], 30_000), false);
});

test("store-and-forward marks only acknowledged events", async () => {
  let acknowledged: string[] = [];

  const store = {
    async getPending() {
      return [baseEvent, { ...baseEvent, eventId: "evt-2" }];
    },
    async markAcknowledged(ids: string[]) {
      acknowledged = ids;
    },
  };

  const transport = {
    async send() {
      return { acceptedEventIds: ["evt-1"] };
    },
  };

  const count = await syncPendingEvents(store, transport, 100);

  assert.equal(count, 1);
  assert.deepEqual(acknowledged, ["evt-1"]);
});
