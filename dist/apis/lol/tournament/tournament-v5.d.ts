import { RegionGroups } from '../../../constants';
import { BaseApiLol } from '../base/base.api.lol';
import { TournamentCodeParametersV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament-code-parameters.dto';
import { LobbyEventV5DTOWrapper } from '../../../models-dto/tournament/tournament-v5/lobby-event-wrapper.dto';
import { ProviderRegistrationParametersV5DTO } from '../../../models-dto/tournament/tournament-v5/provider-registration-parameters.dto';
import { TournamentRegistrationParametersV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament-registration-parameters.dto';
import { TournamentCodeV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament.dto';
import { TournamentCodeUpdateParametersV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament-code-update-parameters.dto';
import { ApiResponseDTO } from '../../../models-dto';
import { TournamentGamesV5DTO } from '../../../models-dto/tournament/tournament-v5/tournament-games-dto';
export declare class TournamentV5 extends BaseApiLol {
    private errorHandler;
    /**
     * Create a tournament code for the given tournament.
     * @param region
     * @param tournamentId
     * @param body
     * @param count
     * @returns string[]
     */
    createTournamentCodes(region: RegionGroups, tournamentId: number, body: TournamentCodeParametersV5DTO, count?: number): Promise<ApiResponseDTO<string[]>>;
    /**
     * Returns the tournament code DTO associated with a tournament code string.
     * @param region
     * @param tournamentCode
     * @returns TournamentCodeV5DTO
     */
    tournamentByCode(region: RegionGroups, tournamentCode: string): Promise<ApiResponseDTO<TournamentCodeV5DTO>>;
    /**
     * Update the pick type, map, spectator type, or allowed puuids for a code.
     * @param region
     * @param tournamentCode
     * @param body
     * @returns void
     */
    updateTournamentCode(region: RegionGroups, tournamentCode: string, body: TournamentCodeUpdateParametersV5DTO): Promise<ApiResponseDTO<void>>;
    /**
     * Gets a list of lobby events by tournament code.
     * @param region
     * @param tournamentCode
     * @returns LobbyEventV5DTOWrapper
     **/
    lobbyEventsByCode(region: RegionGroups, tournamentCode: string): Promise<ApiResponseDTO<LobbyEventV5DTOWrapper>>;
    /**
     * Gets a list of games by tournament code.
     * @param region
     * @param tournamentCode
     * @returns TournamentGamesV5DTO[]
     **/
    gamesByCode(region: RegionGroups, tournamentCode: string): Promise<ApiResponseDTO<TournamentGamesV5DTO[]>>;
    /**
     * Creates a tournament provider and returns its ID.
     *
     * Implementation: Providers will need to call this endpoint first to register their callback URL and their API key with the tournament system before any other tournament provider endpoints will work.
     * @param region
     * @param body
     * @returns number
     */
    createProvider(region: RegionGroups, body: ProviderRegistrationParametersV5DTO): Promise<ApiResponseDTO<number>>;
    /**
     * Create a tournament and return its ID.
     * @param region
     * @param body
     */
    createTournament(region: RegionGroups, body: TournamentRegistrationParametersV5DTO): Promise<ApiResponseDTO<number>>;
}
