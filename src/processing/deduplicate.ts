import { EdgeEvent } from "../domain/edge-event";

export function isDuplicate(
  candidate: EdgeEvent,
  recentEvents: EdgeEvent[],
  windowMs = 30_000
): boolean {
  const candidateTime = new Date(candidate.occurredAt).getTime();

  return recentEvents.some((existing) => {
    if (
      existing.deviceIdentity !== candidate.deviceIdentity ||
      existing.eventType !== candidate.eventType
    ) {
      return false;
    }

    const existingTime = new Date(existing.occurredAt).getTime();
    return Math.abs(candidateTime - existingTime) <= windowMs;
  });
}
