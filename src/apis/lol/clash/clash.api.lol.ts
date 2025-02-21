import { BaseApiLol } from '../base/base.api.lol'
import { ClashPlayerDTO } from '../../../models-dto/clash/player.clash.dto'
import { endpointsClashV1 } from '../../../endpoints'
import { Regions } from '../../../constants'
import { ClashTeamDto } from '../../../models-dto/clash/team.clash.dto'
import { TournamentClashDTO } from '../../../models-dto/clash/tournament/tournament.clash.dto'

/**
 * Clash api methods
 */
export class ClashApi extends BaseApiLol {
  /**
   * This endpoint returns a list of active Clash players for a given summoner ID. If a summoner registers for multiple tournaments at the same time (e.g., Saturday and Sunday) then both registrations would appear in this list.
   * @param region
   * @param summonerId Encrypted summoner id
   */
  playersList (encryptedSummonerId: string, region: Regions) {
    return this.request<ClashPlayerDTO[]>(region, endpointsClashV1.GetPlayers, { params: { encryptedSummonerId } })
  }
  /**
   * Get team by id
   * @param region
   * @param teamId Team id
   */
  getTeamById (teamId: string, region: Regions) {
    return this.request<ClashTeamDto>(region, endpointsClashV1.GetTeam, { params: { teamId } })
  }
  /**
   * Returns a list of active and upcoming tournaments.
   * @param region
   */
  getTournaments (region: Regions) {
    return this.request<TournamentClashDTO[]>(region, endpointsClashV1.GetTournaments)
  }
  /**
   * Get team tournament
   */
  getTeamTournament (teamId: string, region: Regions) {
    return this.request<TournamentClashDTO>(region, endpointsClashV1.GetTournamentByTeamId, { params: { teamId } })
  }
  /**
   * Get tournament by id
   */
  getTournamentById (tournamentId: string | number, region: Regions) {
    return this.request<TournamentClashDTO>(region, endpointsClashV1.GetTournamentById, { params:{ tournamentId } })
  }
}
