# Architecture

## System Goal

An edge architecture should continue collecting and preserving useful field events even when connectivity is unreliable.

The design separates four concerns:

1. device observation
2. local event processing
3. durable edge storage
4. cloud synchronization

## Edge Gateway Responsibilities

The gateway should:

- receive radio observations
- timestamp locally
- normalize device identity
- apply signal and timing rules
- suppress duplicates
- persist accepted events
- track synchronization state
- report gateway health separately

## Cloud Responsibilities

The cloud should:

- authenticate gateways
- accept event batches
- acknowledge accepted records
- maintain durable history
- expose downstream APIs and analytics
- avoid requiring a permanently open edge connection

## Event Lifecycle

```text
observed
  ↓
normalized
  ↓
qualified
  ↓
buffered
  ↓
sync_pending
  ↓
syncing
  ↓
acknowledged
```

Events that fail transmission should return to `sync_pending` with an incremented attempt count.

## Failure Domains

Design separately for:

- radio noise
- duplicate scans
- gateway restart
- local storage pressure
- WAN outage
- DNS failure
- cloud API timeout
- authentication failure
- power interruption

Treating all of these as simply "offline" makes troubleshooting much harder.
