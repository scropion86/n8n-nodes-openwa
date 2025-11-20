"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openwaApiRequest = openwaApiRequest;
async function openwaApiRequest(method, endpoint, body = {}) {
    const credentials = await this.getCredentials('openwaApi');
    const baseUrl = credentials.apiBaseUrl.replace(/\/$/, '');
    const apiKey = credentials.apiKey;
    const headers = {
        api_key: apiKey,
        'Content-Type': 'application/json',
    };
    const options = {
        method: method,
        url: `${baseUrl}${endpoint}`,
        headers,
        json: true,
        body: { args: body },
    };
    return await this.helpers.httpRequest(options);
}
//# sourceMappingURL=ApiRequest.js.map