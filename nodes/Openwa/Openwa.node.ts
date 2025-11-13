import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

import { messageOperations, messageFields } from './operations/Message';
import { chatOperations, chatFields } from './operations/Chat';
import { groupOperations, groupFields } from './operations/Group';
import { contactOperations, contactFields } from './operations/Contact';
import { statusOperations, statusFields } from './operations/Status';
import { webhookOperations, webhookFields } from './operations/Webhook';

export class Openwa implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Openwa',
		name: 'openwa',
		icon: 'file:openwa.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$node.parameters.resource}}',
		description: 'Interact with Openwa API',
		defaults: {
			name: 'Openwa',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'openwaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Chat',
						value: 'chat',
						description: 'Manage chats',
					},
					{
						name: 'Contact',
						value: 'contact',
						description: 'Manage contacts',
					},
					{
						name: 'Group',
						value: 'group',
						description: 'Manage groups',
					},
					{
						name: 'Message',
						value: 'message',
						description: 'Send and manage messages',
					},
					{
						name: 'Status',
						value: 'status',
						description: 'Manage status updates',
					},
					{
						name: 'Webhook',
						value: 'webhook',
						description: 'Manage webhooks',
					},
				],
				default: 'message',
			},
			...messageFields,
			...chatFields,
			...groupFields,
			...contactFields,
			...statusFields,
			...webhookFields,
		],
		usableAsTool: true,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				let operationResult: unknown;

				if (resource === 'message') {
					operationResult = await messageOperations.call(this, operation, i);
				} else if (resource === 'chat') {
					operationResult = await chatOperations.call(this, operation, i);
				} else if (resource === 'group') {
					operationResult = await groupOperations.call(this, operation, i);
				} else if (resource === 'contact') {
					operationResult = await contactOperations.call(this, operation, i);
				} else if (resource === 'status') {
					operationResult = await statusOperations.call(this, operation, i);
				} else if (resource === 'webhook') {
					operationResult = await webhookOperations.call(this, operation, i);
				} else {
					throw new NodeOperationError(
						this.getNode(),
						`Resource "${resource}" is not known`,
					);
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(operationResult as never),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error instanceof Error ? error.message : 'Unknown error occurred',
						},
						pairedItem: { item: i },
					});
				} else {
					throw error;
				}
			}
		}

		return [returnData];
	}
}
