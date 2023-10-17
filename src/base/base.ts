import { AxiosRequestConfig, AxiosResponse } from 'axios'
import * as _ from 'lodash'
import { ApiKeyNotFound } from '../errors'
import { IEndpoint } from '../endpoints'
import { TOO_MANY_REQUESTS, SERVICE_UNAVAILABLE } from 'http-status-codes'
import { config } from 'dotenv'
import { ApiResponseDTO } from '../models-dto/api-response/api-response'
import { RateLimitDto } from '../models-dto/rate-limit/rate-limit.dto'
import { GenericError } from '../errors/Generic.error'
import { RateLimitError } from '../errors/rate-limit.error'
import { IBaseApiParams, IParams, waiter } from './base.utils'
import { ServiceUnavailable } from '../errors/service-unavailable.error'
import { BaseConstants, BaseApiGames } from './base.const'
import { Logger } from './logger.base'
import { RequestBase } from './request.base'
import { RegionGroups } from '../constants'

config()

interface RequestOpts {
  params?: IParams
  forceError?: boolean
  queryParams?: any
  method?: AxiosRequestConfig['method']
  body?: Record<string, any>;
}
export class BaseApi<Region extends string> {
  protected readonly game: BaseApiGames = BaseApiGames.LOL
  private readonly baseUrl = BaseConstants.BASE_URL
  private key: string
  private concurrency: number | undefined
  private rateLimitRetry: boolean = true
  private rateLimitRetryAttempts: number = BaseConstants.RETRY_ATTEMPTS
  private debug = {
    logTime: false,
    logUrls: false,
    logRatelimits: false
  }

  constructor()
  constructor(params: IBaseApiParams)
  /**
   * Base api
   * @param key Riot games api key
   */
  constructor(key: string)
  constructor(param?: string | IBaseApiParams) {
    this.key = process.env.RIOT_API_KEY || ''
    if (typeof param === 'string') {
      this.key = param
    } else if (param) {
      if (typeof param.key === 'string') {
        this.key = param.key
      }
      this.setParams(param)
    }
  }

  private setParams(param: IBaseApiParams) {
    if (typeof param.rateLimitRetry !== 'undefined') {
      this.rateLimitRetry = param.rateLimitRetry
    }
    if (typeof param.rateLimitRetryAttempts !== 'undefined') {
      this.rateLimitRetryAttempts = param.rateLimitRetryAttempts
    }
    if (typeof param.debug !== 'undefined') {
      if (typeof param.debug.logTime !== 'undefined') {
        _.set(this.debug, 'logTime', param.debug.logTime)
      }
      if (typeof param.debug.logUrls !== 'undefined') {
        _.set(this.debug, 'logUrls', param.debug.logUrls)
      }
      if (typeof param.debug.logRatelimits !== 'undefined') {
        _.set(this.debug, 'logRatelimits', param.debug.logRatelimits)
      }
    }
    this.concurrency = param.concurrency
    if (typeof param.concurrency !== 'undefined') {
      RequestBase.setConcurrency(param.concurrency)
    } else {
      RequestBase.setConcurrency(Infinity)
    }
  }

  private getRateLimits(headers: any): RateLimitDto {
    return {
      Type: _.get(headers, 'x-rate-limit-type', null),
      AppRateLimit: _.get(headers, 'x-app-rate-limit', null),
      AppRateLimitCount: _.get(headers, 'x-app-rate-limit-count', null),
      MethodRateLimit: _.get(headers, 'x-method-rate-limit'),
      MethodRatelimitCount: _.get(headers, 'x-method-rate-limit-count', null),
      RetryAfter: +_.get(headers, 'retry-after', 0),
      EdgeTraceId: _.get(headers, 'x-riot-edge-trace-id')
    }
  }

  private getBaseUrl() {
    return this.baseUrl.replace(':game', this.game)
  }

  private getApiUrl(endpoint: IEndpoint, params: IParams) {
    const { prefix, version, path } = endpoint
    const basePath = `${prefix}/v${version}/${path}`
    const re = /\$\(([^\)]+)?\)/g
    let base = `${this.getBaseUrl()}/${basePath}`
    let match
    // tslint:disable:no-conditional-assignment
    while ((match = re.exec(base))) {
      const [key] = match
      const value = encodeURI(String(params[match[1]]))
      base = base.replace(key, value)
      re.lastIndex = 0
    }
    return base
  }

  private isRateLimitError(e: any) {
    if (!e) {
      return false
    }
    return e.status === TOO_MANY_REQUESTS || e.response?.status === TOO_MANY_REQUESTS
  }

  private isServiceUnavailableError(e: any) {
    if (!e) {
      return false
    }
    return e.status === SERVICE_UNAVAILABLE || e.response?.status === SERVICE_UNAVAILABLE
  }

  private getError(e: any) {
    const headers = this.getRateLimits(_.get(e, 'response.headers'))
    if (this.isRateLimitError(e)) {
      return new RateLimitError(headers)
    }
    if (this.isServiceUnavailableError(e)) {
      return new ServiceUnavailable(headers, e)
    }
    // Otherwise generic error
    return new GenericError(headers, e)
  }

  private internalRequest<T>(options: AxiosRequestConfig): Promise<T> {
    return RequestBase.request<T>(options)
  }

  private async retryRateLimit<T>(region: Region | RegionGroups, endpoint: IEndpoint, opts?: RequestOpts): Promise<ApiResponseDTO<T>> {
    const { forceError } = opts || {}
    let baseError = this.getError(forceError)
    const isRateLimitError = this.isRateLimitError(forceError) || this.isServiceUnavailableError(forceError)
    if (!this.rateLimitRetry || !isRateLimitError || this.rateLimitRetryAttempts < 1) {
      throw baseError
    }
    for (let i = 0; i < this.rateLimitRetryAttempts; i++) {
      try {
        const response = await this.request<T>(region, endpoint, opts)
        return response
      } catch (error) {
        const parseError = this.getError(error)
        // Isn't rate limit error
        if (!this.isRateLimitError(error) && !this.isServiceUnavailableError(error)) {
          throw parseError
        }
        // Set a new attemp
        const {
          rateLimits: { RetryAfter }
        } = parseError
        const waitSeconds = this.isServiceUnavailableError(forceError) ? BaseConstants.SERVICE_UNAVAILABLE : BaseConstants.RATE_LIMIT
        const msToWait = (RetryAfter || 0) * 1000 + waitSeconds * 1000 * Math.random()
        // Log
        if (this.debug.logRatelimits) {
          Logger.rateLimit(endpoint, msToWait)
        }
        // Wait
        await waiter(msToWait)
      }
    }
    // Throw rate limit
    throw baseError
  }

  protected getParam(): IBaseApiParams {
    return {
      key: this.key,
      rateLimitRetry: this.rateLimitRetry,
      rateLimitRetryAttempts: this.rateLimitRetryAttempts,
      concurrency: this.concurrency,
      debug: this.debug
    }
  }

  protected async request<T>(region: Region | RegionGroups, endpoint: IEndpoint, opts?: RequestOpts): Promise<ApiResponseDTO<T>> {
    if (!this.key) {
      throw new ApiKeyNotFound()
    }
    const { params = {}, forceError, queryParams = {}, method = 'GET' } = opts || {}

    // Url params
    params.region = region.toLowerCase()
    // Format
    const url = this.getApiUrl(endpoint, params)
    // Logger
    if (this.debug.logTime) {
      Logger.start(endpoint, url)
    }
    const options: AxiosRequestConfig = {
      url,
      method,
      headers: {
        Origin: null,
        'X-Riot-Token': this.key
      },
      data: opts?.body,
      params: queryParams
    }
    if (this.debug.logUrls) {
      Logger.uri(options, endpoint)
    }
    try {
      const apiResponse = await this.internalRequest<AxiosResponse<T>>(options)
      const { data, headers } = apiResponse
      return {
        rateLimits: this.getRateLimits(headers),
        response: data
      }
    } catch (e) {
      if (forceError) {
        throw e
      }
      return await this.retryRateLimit<T>(region, endpoint, opts)
    } finally {
      if (this.debug.logTime) {
        Logger.end(endpoint, url)
      }
    }
  }
}
