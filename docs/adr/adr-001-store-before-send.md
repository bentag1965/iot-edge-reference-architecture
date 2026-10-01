# ADR-001: Persist accepted edge events before cloud transmission

**Status:** Accepted

## Context

Field gateways may lose WAN connectivity at any time. If an accepted event exists only in memory while transmission is attempted, a gateway restart or power interruption can cause permanent data loss.

## Decision

After local qualification and deduplication, persist accepted events to durable local storage before attempting cloud synchronization.

## Consequences

### Positive

- WAN loss does not imply event loss
- gateway restart can resume unsynchronized work
- cloud delivery can be retried safely
- local evidence exists for troubleshooting

### Tradeoffs

- local storage lifecycle must be managed
- idempotent cloud ingestion is required
- disk health becomes part of system reliability
