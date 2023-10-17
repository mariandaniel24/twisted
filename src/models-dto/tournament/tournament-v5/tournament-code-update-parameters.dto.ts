export class TournamentCodeUpdateParametersV5DTO {
  /*
   * Optional list of encrypted puuids in order to validate the players eligible to join the lobby. NOTE: We currently do not enforce participants at the team level, but rather the aggregate of teamOne and teamTwo. We may add the ability to enforce at the team level in the future.
   */
  allowedParticipants?: string[]
  /*
   * The pick type (Legal values: BLIND_PICK, DRAFT_MODE, ALL_RANDOM, TOURNAMENT_DRAFT)
   */
  pickType: 'BLIND_PICK' | 'DRAFT_MODE' | 'ALL_RANDOM' | 'TOURNAMENT_DRAFT'
  /*
   * The map type (Legal values: SUMMONERS_RIFT, HOWLING_ABYSS)
   */
  mapType: 'SUMMONERS_RIFT' | 'HOWLING_ABYSS'
  /*
   * The spectator type (Legal values: NONE, LOBBYONLY, ALL)
   */
  spectatorType: 'NONE' | 'LOBBYONLY' | 'ALL'
}
