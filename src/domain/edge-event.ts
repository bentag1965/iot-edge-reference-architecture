export type RadioType = "ble" | "rfid" | "uhf" | "nfc";

export interface RawObservation {
  observationId: string;
  radioType: RadioType;
  observedAt: string;
  sourceId: string;
  deviceIdentity: string;
  rssi?: number;
  metadata?: Record<string, unknown>;
}

export interface EdgeEvent {
  eventId: string;
  eventType: string;
  deviceIdentity: string;
  gatewayId: string;
  occurredAt: string;
  observations: number;
  signal?: {
    averageRssi?: number;
    minimumRssi?: number;
    maximumRssi?: number;
  };
  syncStatus: "pending" | "acknowledged";
}
