# Power Resilience

Edge reliability includes power.

## Short-Outage Goal

A local UPS or battery stage can allow the gateway to:

- survive brief power interruptions
- flush local writes safely
- preserve network state
- send a final health event
- shut down cleanly when appropriate

## Design Questions

- What is the gateway's steady-state draw?
- What is its startup surge?
- How long must it ride through an outage?
- Does the modem/router need backup power too?
- Can the application detect low-battery state?
- Is graceful shutdown supported?

## Principle

Backing up only the compute device while leaving the network path unpowered may preserve data locally, but it does not preserve communications. The entire minimum viable edge path should be considered.
