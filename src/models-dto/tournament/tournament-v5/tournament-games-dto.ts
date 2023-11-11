import { TournamentTeamV5DTO } from './tournament-team-v5.dto'

export class TournamentGamesV5DTO {
  winningTeam: TournamentTeamV5DTO[]
  losingTeam: TournamentTeamV5DTO[]
  /* Tournament Code */
  shortCode: string
  /* Metadata for the TournamentCode */
  metaData: string
  gameId: number
  gameName: string
  gameType: string
  /* Game Map ID */
  gameMap: number
  gameMode: string
  region: string
}
