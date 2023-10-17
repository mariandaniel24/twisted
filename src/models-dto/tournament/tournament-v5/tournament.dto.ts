export class TournamentCodeV5DTO {
  /*
   * The tournament code.
   */
  code: string
  /*
   * The spectator mode for the tournament code game.
   */
  spectators: 'NONE' | 'LOBBYONLY' | 'ALL'
  /*
   * The lobby name for the tournament code game.
   */
  lobbyName: string
  /*
   * The metadata for tournament code.
   */
  metaData?: string
  /*
   * The password for the tournament code game.
   */
  password: string
  /*
   * The team size for the tournament code game.
   */
  teamSize: 1 | 2 | 3 | 4 | 5
  /*
   * The provider's ID.
   */
  providerId: number
  /*
   * The pick mode for tournament code game.
   */
  pickType: 'BLIND_PICK' | 'DRAFT_MODE' | 'ALL_RANDOM' | 'TOURNAMENT_DRAFT'
  /*
   * The tournament's ID.
   */
  tournamentId: number
  /*
   * The tournament code's ID.
   */
  id: number
  /*
   * The tournament code's region. (Legal values: BR, EUNE, EUW, JP, LAN, LAS, NA, OCE, PBE, RU, TR, KR)
   */
  region: 'BR' | 'EUNE' | 'EUW' | 'JP' | 'LAN' | 'LAS' | 'NA' | 'OCE' | 'PBE' | 'RU' | 'TR' | 'KR'
  /*
   * The game map for the tournament code game
   */
  map: 'SUMMONERS_RIFT' | 'HOWLING_ABYSS'
  /*
   * The puuids of the participants (Encrypted)
   */
  participants?: string[]
}
