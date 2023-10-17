import { NOT_FOUND } from 'http-status-codes'
import { Regions } from '../../../constants'
import { FeaturedGamesDTO } from '../../../models-dto/spectator/featured-games.dto'
import { endpointsV5 } from '../../../endpoints/endpoints'
import { BaseApiLol } from '../base/base.api.lol'
import { TournamentCodeParametersV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament-code-parameters.dto'
import { LobbyEventV5DTOWrapper } from '../../../models-dto/tournament/tournament-v5/lobby-event-wrapper.dto'
import { ProviderRegistrationParametersV5DTO } from '../../../models-dto/tournament/tournament-v5/provider-registration-parameters.dto'
import { TournamentRegistrationParametersV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament-registration-parameters.dto'
import { TournamentCodeV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament.dto'
import { TournamentCodeUpdateParametersV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament-code-update-parameters.dto'
import { ApiResponseDTO } from '../../../models-dto'

export class TournamentV5 extends BaseApiLol {
  private errorHandler(e: any) {
    const { statusCode } = e.error || e
    if (statusCode !== NOT_FOUND) {
      throw e
    }
  }
  /**
   * Create a tournament code for the given tournament.
   * @param region
   * @param tournamentId
   * @param parameters
   * @param count
   * @returns string[]
   */
  public async createTournamentCodes(
    region: Regions,
    tournamentId: number,
    parameters: TournamentCodeParametersV5DTO,
    count = 1
  ): Promise<ApiResponseDTO<string[]>> {
    const params = {
      tournamentId,
      count
    }
    return this.request<string[]>(region, endpointsV5.TournamentCodes, params, false, parameters)
  }

  /**
   * Returns the tournament code DTO associated with a tournament code string.
   * @param region
   * @param tournamentCode
   * @returns TournamentCodeV5DTO
   */
  public async tournamentByCode(region: Regions, tournamentCode: string): Promise<ApiResponseDTO<TournamentCodeV5DTO>> {
    const params = {
      tournamentCode
    }
    return this.request<TournamentCodeV5DTO>(region, endpointsV5.TournamentByCode, params, false)
  }

  /**
   * Update the pick type, map, spectator type, or allowed puuids for a code.
   * @param region
   * @param tournamentCode
   * @param parameters
   * @returns void
   */
  public async updateTournamentCode(region: Regions, tournamentCode: string, parameters: TournamentCodeUpdateParametersV5DTO): Promise<ApiResponseDTO<void>> {
    const params = {
      tournamentCode
    }
    return this.request<void>(region, endpointsV5.PutTournamentCode, params, false, parameters)
  }

  /**
   * Gets a list of lobby events by tournament code.
   * @param region
   * @param tournamentCode
   * @returns LobbyEventV5DTOWrapper
   **/
  public async lobbyEventsByCode(region: Regions, tournamentCode: string): Promise<ApiResponseDTO<LobbyEventV5DTOWrapper>> {
    const params = {
      tournamentCode
    }
    return this.request<LobbyEventV5DTOWrapper>(region, endpointsV5.TournamentLobbyEventsByCode, params)
  }

  /**
   * Creates a tournament provider and returns its ID.
   *
   * Implementation: Providers will need to call this endpoint first to register their callback URL and their API key with the tournament system before any other tournament provider endpoints will work.
   * @param region
   * @param providers
   * @returns number
   */
  public async createProvider(region: Regions, providers: ProviderRegistrationParametersV5DTO): Promise<ApiResponseDTO<number>> {
    return this.request<number>(region, endpointsV5.PostTournamentProviders, {}, false, providers)
  }

  /**
   * Create a tournament and return its ID.
   * @param region
   * @param parameters
   */
  public async createTournament(region: Regions, parameters: TournamentRegistrationParametersV5DTO): Promise<ApiResponseDTO<number>> {
    return this.request<number>(region, endpointsV5.PostTournament, {}, false, parameters)
  }
}
