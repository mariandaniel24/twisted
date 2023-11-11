export declare class TournamentCodeUpdateParametersV5DTO {
    allowedParticipants?: string[];
    pickType: 'BLIND_PICK' | 'DRAFT_MODE' | 'ALL_RANDOM' | 'TOURNAMENT_DRAFT';
    mapType: 'SUMMONERS_RIFT' | 'HOWLING_ABYSS';
    spectatorType: 'NONE' | 'LOBBYONLY' | 'ALL';
}
