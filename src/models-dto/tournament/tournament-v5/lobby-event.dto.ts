export class LobbyEventV5DTO {
  /**
   *  The puuid that triggered the event (Encrypted)
   */
  puuid: string;
  /**
   * The type of event that was triggered
   */
  eventType: string;
  /**
   * Timestamp from the event
   */
  timestamp: string;
}
