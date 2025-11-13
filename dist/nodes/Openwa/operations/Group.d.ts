import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
export declare const groupFields: INodeProperties[];
export declare function groupOperations(this: IExecuteFunctions, operation: string, itemIndex: number): Promise<unknown>;
