# Incident Scenario: Gateway Has Been Offline for Two Hours

## Symptoms

- backhaul health failed
- local queue depth rises
- oldest pending event age increases
- radio observations continue

## Response

1. confirm local event collection is still functioning
2. verify durable storage has sufficient free capacity
3. check gateway uptime and recent restart history
4. validate DNS, route, and authenticated cloud reachability separately
5. avoid deleting queued events during connectivity troubleshooting
6. once backhaul returns, drain in controlled batches
7. confirm cloud acknowledgements before clearing local records

## Important Principle

The outage is a connectivity incident, not necessarily a data-loss incident. Preserve the local queue and prove synchronization before cleanup.
