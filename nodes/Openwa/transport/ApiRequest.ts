import type { IExecuteFunctions, IDataObject, IHttpRequestMethods } from 'n8n-workflow';

export async function openwaApiRequest(
    this: IExecuteFunctions,
    method: string,
    endpoint: string,
    body: IDataObject = {},
): Promise<unknown> {
    const credentials = await this.getCredentials('openwaApi');
    const baseUrl = (credentials.apiBaseUrl as string).replace(/\/$/, '');
    const apiKey = credentials.apiKey as string;

    const headers = {
        api_key: apiKey,
        'Content-Type': 'application/json',
    };

    const options = {
        method: method as IHttpRequestMethods,
        url: `${baseUrl}${endpoint}`,
        headers,
        json: true,
        body: { args: body },
    };

    return await this.helpers.httpRequest(options);
}
