"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenwaApi = void 0;
class OpenwaApi {
    constructor() {
        this.name = 'openwaApi';
        this.displayName = 'Openwa API';
        this.icon = 'file:openwa.svg';
        this.documentationUrl = 'https://docs.openwa.dev/docs/reference/api/Client/classes/Client#methods';
        this.properties = [
            {
                displayName: 'API Base URL',
                name: 'apiBaseUrl',
                type: 'string',
                required: true,
                default: 'http://domain.com:8080',
                description: 'The base URL of the API server',
                placeholder: 'http://domain.com:8080',
            },
            {
                displayName: 'API Key',
                name: 'apiKey',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                default: '',
                description: 'API Key to authenticate requests',
                noDataExpression: true,
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    api_key: '={{$credentials.apiKey}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials.apiBaseUrl}}',
                url: '/getSessionInfo',
                method: 'POST',
            },
        };
    }
}
exports.OpenwaApi = OpenwaApi;
//# sourceMappingURL=OpenwaApi.credentials.js.map