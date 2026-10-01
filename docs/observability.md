# Observability and Service Signals

## Operational Goal

A gateway should reveal whether it is collecting, buffering, synchronizing, or falling behind.

## Key Signals

| Signal | Why it matters |
|---|---|
| raw observation rate | detects radio silence or storms |
| accepted event rate | shows qualification output |
| duplicate suppression rate | exposes noisy readers or threshold issues |
| pending queue depth | shows unsynchronized backlog |
| oldest pending event age | measures data staleness |
| sync success rate | tracks cloud delivery health |
| gateway uptime | catches reboot loops |
| storage utilization | protects durable buffering |
| backhaul state | distinguishes WAN loss from cloud failure |
| power/battery status | exposes field resilience risk |

## Suggested Service Objectives

- zero accepted events lost during a temporary WAN outage
- 99% of accepted events synchronize within 5 minutes when backhaul is healthy
- 100% of synchronized events retain stable event IDs
- gateway local queue remains below defined storage-pressure threshold

## Alert Conditions

- no observations from an expected active gateway
- queue depth or oldest-event age rising continuously
- storage utilization above 80%
- repeated gateway restarts
- sync failures while network health checks remain successful
- duplicate suppression rate changes sharply from baseline
