import { TournamentTeamV5DTO } from './tournament-team-v5.dto';
export declare class TournamentGamesV5DTO {
    winningTeam: TournamentTeamV5DTO[];
    losingTeam: TournamentTeamV5DTO[];
    shortCode: string;
    metaData: string;
    gameId: number;
    gameName: string;
    gameType: string;
    gameMap: number;
    gameMode: string;
    region: string;
}
