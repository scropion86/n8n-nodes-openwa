import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
export declare const statusFields: INodeProperties[];
export declare function statusOperations(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<unknown>;
