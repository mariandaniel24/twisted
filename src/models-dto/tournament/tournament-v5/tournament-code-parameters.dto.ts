export class TournamentCodeParametersV5DTO {
  /**
   * Optional list of encrypted summonerIds in order to validate the players eligible to join the lobby. NOTE: We currently do not enforce participants at the team level, but rather the aggregate of teamOne and teamTwo. We may add the ability to enforce at the team level in the future.
   */
  allowedSummonerIds?: string[]
  /**
   * Optional string that may contain any data in any format, if specified at all. Used to denote any custom information about the game.
   */
  metadata?: string
  /**
   * The pick type of the game. (Legal values: BLIND_PICK, DRAFT_MODE, ALL_RANDOM, TOURNAMENT_DRAFT)
   */
  pickType: 'BLIND_PICK' | 'DRAFT_MODE' | 'ALL_RANDOM' | 'TOURNAMENT_DRAFT'
  /**
   * The map type of the game. (Legal values: SUMMONERS_RIFT, TWISTED_TREELINE, HOWLING_ABYSS)
   */
  mapType: 'SUMMONERS_RIFT' | 'TWISTED_TREELINE' | 'HOWLING_ABYSS'
  /**
   * The spectator type of the game. (Legal values: NONE, LOBBYONLY, ALL)
   */
  spectatorType: 'NONE' | 'LOBBYONLY' | 'ALL'
  /**
   * The team size of the game. Valid values are 1-5.
   */
  teamSize: 1 | 2 | 3 | 4 | 5
}
