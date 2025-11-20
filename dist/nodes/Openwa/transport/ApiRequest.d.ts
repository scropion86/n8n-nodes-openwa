import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
export declare function openwaApiRequest(this: IExecuteFunctions, method: string, endpoint: string, body?: IDataObject): Promise<unknown>;
