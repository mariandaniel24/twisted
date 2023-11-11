export declare class TournamentCodeV5DTO {
    code: string;
    spectators: string;
    lobbyName: string;
    metaData: string;
    password: string;
    teamSize: 1 | 2 | 3 | 4 | 5;
    providerId: number;
    pickType: 'BLIND_PICK' | 'DRAFT_MODE' | 'ALL_RANDOM' | 'TOURNAMENT_DRAFT';
    tournamentId: number;
    id: number;
    region: string;
    map: string;
    participants: string[];
}
