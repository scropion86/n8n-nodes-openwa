import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
export declare const webhookFields: INodeProperties[];
export declare function webhookOperations(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<unknown>;
