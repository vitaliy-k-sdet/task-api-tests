import { request, APIRequestContext } from '@playwright/test';
import * as crypto from 'crypto';
import { keyVault } from '../../secrets/rfq-key-vault';
import apiUrlProvider from '../config/url-provider';

const apiKey = keyVault.rfqApiKey;
const apiSecret = keyVault.rfqApiSecret;
const baseUrl = apiUrlProvider.baseUrl;

/**
 * Generates a signed authenticated Playwright API request context using HMAC SHA-384.
 * 
 * This context includes the necessary `x-api-key`, `x-nonce`, and `x-signature` headers
 * required by API for authentication.
 *
 * @param apiPath - The relative path of the API endpoint being requested (e.g., `/users/v1/userbalance`).
 * @param httpMethod - The HTTP method used for the request (e.g., `'GET'`, `'POST'`).
 * @returns A Promise resolving to a configured APIRequestContext with the authentication headers.
 */
export async function apiAuthRequest(apiPath: string, httpMethod: string): Promise<APIRequestContext> {
  const nonce = Date.now().toString();

  const signatureContent = JSON.stringify({
    httpMethod,
    path: apiPath,
    nonce,
  });

  const signature = crypto
    .createHmac('sha384', apiSecret)
    .update(signatureContent)
    .digest('hex');

  const context: APIRequestContext = await request.newContext({
    baseURL: baseUrl,
    extraHTTPHeaders: {
      'x-nonce': nonce,
      'x-api-key': apiKey,
      'x-signature': signature,
    },
  });

  return context;
}
