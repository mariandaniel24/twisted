import { AxiosRequestConfig } from 'axios';
import { IEndpoint } from '../endpoints';
import { ApiResponseDTO } from '../models-dto/api-response/api-response';
import { IBaseApiParams, IParams } from './base.utils';
import { BaseApiGames } from './base.const';
import { RegionGroups } from '../constants';
interface RequestOpts {
    params?: IParams;
    forceError?: boolean;
    queryParams?: any;
    method?: AxiosRequestConfig['method'];
    body?: Record<string, any>;
}
export declare class BaseApi<Region extends string> {
    protected readonly game: BaseApiGames;
    private readonly baseUrl;
    private key;
    private concurrency;
    private rateLimitRetry;
    private rateLimitRetryAttempts;
    private debug;
    constructor();
    constructor(params: IBaseApiParams);
    /**
     * Base api
     * @param key Riot games api key
     */
    constructor(key: string);
    private setParams;
    private getRateLimits;
    private getBaseUrl;
    private getApiUrl;
    private isRateLimitError;
    private isServiceUnavailableError;
    private getError;
    private internalRequest;
    private retryRateLimit;
    protected getParam(): IBaseApiParams;
    protected request<T>(region: Region | RegionGroups, endpoint: IEndpoint, opts?: RequestOpts): Promise<ApiResponseDTO<T>>;
}
export {};
