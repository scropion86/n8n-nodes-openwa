import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
export declare const messageFields: INodeProperties[];
export declare function messageOperations(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<unknown>;
