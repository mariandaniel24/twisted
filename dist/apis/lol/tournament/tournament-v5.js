"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentV5 = void 0;
const http_status_codes_1 = require("http-status-codes");
const endpoints_1 = require("../../../endpoints/endpoints");
const base_api_lol_1 = require("../base/base.api.lol");
class TournamentV5 extends base_api_lol_1.BaseApiLol {
    errorHandler(e) {
        const { statusCode } = e.error || e;
        if (statusCode !== http_status_codes_1.NOT_FOUND) {
            throw e;
        }
    }
    /**
     * Create a tournament code for the given tournament.
     * @param region
     * @param tournamentId
     * @param body
     * @param count
     * @returns string[]
     */
    createTournamentCodes(region, tournamentId, body, count = 1) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryParams = {
                tournamentId,
                count
            };
            return this.request(region, endpoints_1.endpointsV5.TournamentCodes, { queryParams, body, method: 'POST' });
        });
    }
    /**
     * Returns the tournament code DTO associated with a tournament code string.
     * @param region
     * @param tournamentCode
     * @returns TournamentCodeV5DTO
     */
    tournamentByCode(region, tournamentCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                tournamentCode
            };
            return this.request(region, endpoints_1.endpointsV5.TournamentByCode, { params, forceError: false });
        });
    }
    /**
     * Update the pick type, map, spectator type, or allowed puuids for a code.
     * @param region
     * @param tournamentCode
     * @param body
     * @returns void
     */
    updateTournamentCode(region, tournamentCode, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                tournamentCode
            };
            return this.request(region, endpoints_1.endpointsV5.PutTournamentCode, { params, body, method: 'PUT' });
        });
    }
    /**
     * Gets a list of lobby events by tournament code.
     * @param region
     * @param tournamentCode
     * @returns LobbyEventV5DTOWrapper
     **/
    lobbyEventsByCode(region, tournamentCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                tournamentCode
            };
            return this.request(region, endpoints_1.endpointsV5.TournamentLobbyEventsByCode, { params });
        });
    }
    /**
     * Gets a list of games by tournament code.
     * @param region
     * @param tournamentCode
     * @returns TournamentGamesV5DTO[]
     **/
    gamesByCode(region, tournamentCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                tournamentCode
            };
            return this.request(region, endpoints_1.endpointsV5.TournamentGamesByCode, { params });
        });
    }
    /**
     * Creates a tournament provider and returns its ID.
     *
     * Implementation: Providers will need to call this endpoint first to register their callback URL and their API key with the tournament system before any other tournament provider endpoints will work.
     * @param region
     * @param body
     * @returns number
     */
    createProvider(region, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(region, endpoints_1.endpointsV5.PostTournamentProviders, { body, method: 'POST' });
        });
    }
    /**
     * Create a tournament and return its ID.
     * @param region
     * @param body
     */
    createTournament(region, body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request(region, endpoints_1.endpointsV5.PostTournament, { params: {}, body, method: 'POST' });
        });
    }
}
exports.TournamentV5 = TournamentV5;
