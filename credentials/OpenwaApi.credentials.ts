import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class OpenwaApi implements ICredentialType {
	name = 'openwaApi';

	displayName = 'Openwa API';
    
	// small icon reference used by n8n for credentials
	icon: Icon = 'file:openwa.svg';

	// Link to your community node's README
	documentationUrl = 'https://docs.openwa.dev/docs/reference/api/Client/classes/Client#methods';

	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				api_key: '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiBaseUrl}}',
			url: '/getSessionInfo',
			method: 'POST',
		},
	};
}
