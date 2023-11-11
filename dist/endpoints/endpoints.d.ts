export interface IEndpoint {
    path: string;
    version: number;
    prefix: string;
}
interface IEndpoints {
    [key: string]: IEndpoint;
}
export declare const endpointsV5: {
    MatchListing: {
        path: string;
        prefix: string;
        version: number;
    };
    Match: {
        path: string;
        prefix: string;
        version: number;
    };
    MatchTimeline: {
        path: string;
        prefix: string;
        version: number;
    };
    TournamentCodes: {
        path: string;
        prefix: string;
        version: number;
    };
    TournamentByCode: {
        path: string;
        prefix: string;
        version: number;
    };
    PutTournamentCode: {
        path: string;
        prefix: string;
        version: number;
    };
    TournamentLobbyEventsByCode: {
        path: string;
        prefix: string;
        version: number;
    };
    TournamentGamesByCode: {
        path: string;
        prefix: string;
        version: number;
    };
    PostTournamentProviders: {
        path: string;
        prefix: string;
        version: number;
    };
    PostTournament: {
        path: string;
        prefix: string;
        version: number;
    };
};
export declare const endpointsV4: IEndpoints;
export declare const endpointsV3: IEndpoints;
export declare const endpointsTFTV1: IEndpoints;
export declare const endpointsClashV1: IEndpoints;
export {};
