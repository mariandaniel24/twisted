import { TournamentRegions } from '../../../constants';

export class ProviderRegistrationParametersV5DTO {
  /**
   * The provider's callback URL to which tournament game results in this region should be posted. The URL must be well-formed, use the http or https protocol, and use the default port for the protocol (http URLs must use port 80, https URLs must use port 443).
   */
  url: string;
  /**
   * The region in which the provider will be running tournaments.
   */
  region: TournamentRegions;
}
