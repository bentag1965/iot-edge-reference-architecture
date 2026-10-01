# BLE Proximity and RSSI

BLE RSSI is useful, but it is noisy.

A single RSSI reading should rarely be treated as proof that a device has entered or left a physical zone.

## Better Pattern

Use a combination of:

- rolling samples
- minimum observation count
- time window
- configurable RSSI threshold
- hysteresis
- cooldown/deduplication period

## Example

Instead of:

```text
RSSI > -70 → present
```

use:

```text
3 of the last 5 observations exceed threshold
AND
observations occurred within 10 seconds
AND
device has not already generated a presence event inside cooldown window
```

## Hysteresis

Entry and exit thresholds do not need to be identical.

For example:

```text
entry threshold: -67 dBm
exit threshold:  -75 dBm
```

This reduces rapid state flapping near the boundary.

Thresholds should be calibrated to the physical environment rather than treated as universal constants.
