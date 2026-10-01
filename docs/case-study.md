# Case Study: Resilient Edge Event Collection

## Problem

Field devices produce noisy observations in environments where power and WAN connectivity cannot be assumed. Sending every radio observation directly to the cloud creates false events, unnecessary traffic, and data loss during outages.

## Constraints

- BLE signal strength fluctuates
- RFID/UHF readers may produce repeated reads
- WAN connectivity can disappear without warning
- gateways may reboot
- power interruptions are common field conditions
- cloud services should not need a permanently open connection

## Design Choices

### Normalize before transmit
Raw radio observations become business events only after qualification.

### Deduplicate at the edge
Repeated observations are suppressed close to the source.

### Store before send
Accepted events are persisted locally before cloud transmission.

### Idempotent synchronization
Stable event IDs allow safe replay after connectivity returns.

### Backhaul abstraction
Application logic depends on service reachability rather than a specific network interface.

## Failure Handling

The architecture explicitly considers WAN outage, DNS failure, gateway restart, local storage pressure, power interruption, duplicate reads, and connectivity flapping.

## Observability

A production gateway should report:

- queue depth
- oldest unsynchronized event age
- radio observation rate
- accepted-event rate
- duplicate suppression rate
- backhaul health
- gateway uptime
- storage utilization
- power/battery status where available

## Production Hardening

Next steps include encrypted local storage where appropriate, device identity provisioning, certificate-based gateway authentication, signed updates, watchdog behavior, and fleet-level health dashboards.

## Engineering Takeaway

An edge system is reliable when the cloud can disappear for a while and the field operation still behaves predictably.
