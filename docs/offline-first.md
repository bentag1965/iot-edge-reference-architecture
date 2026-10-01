# Offline-First Operation

Intermittent connectivity should not mean lost field data.

## Store-and-Forward Pattern

1. Accept and validate the local event.
2. Write it to durable local storage.
3. Mark it `sync_pending`.
4. Attempt cloud delivery asynchronously.
5. Require an acknowledgement before marking the event synchronized.
6. Retry later when connectivity returns.

## Important Properties

### Durable queue
Memory-only queues disappear during restart or power loss.

### Stable event ID
The cloud and gateway should share an immutable event ID so replay is safe.

### Idempotent cloud ingress
If the gateway retransmits an already accepted event, the cloud should recognize it rather than create a duplicate.

### Batching
When reconnecting after a long outage, controlled batches prevent a gateway from overwhelming either the WAN link or cloud API.
