# Connectivity Strategy

Field gateways may have several possible backhaul paths:

- Ethernet
- Wi-Fi
- LTE/5G
- satellite
- customer-provided WAN

## Connectivity Abstraction

Application logic should ask:

```text
Can I reach the required service?
```

rather than:

```text
Is Wi-Fi connected?
```

A radio can be associated while DNS, routing, or the upstream API is unavailable.

## Health Checks

Useful checks include:

- local interface state
- default route
- DNS resolution
- HTTPS reachability
- authenticated API heartbeat

## Failover

A practical failover policy should consider:

- interface priority
- cost
- data caps
- latency
- minimum dwell time
- recovery stability

Avoid continuously bouncing between interfaces when signal quality is marginal.
