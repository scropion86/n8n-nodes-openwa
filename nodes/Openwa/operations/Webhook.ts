import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';
import { openwaApiRequest } from '../transport/ApiRequest';

export const webhookFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['webhook'],
			},
		},
		options: [
			{
				name: 'Register Webhook',
				value: 'registerWebhook',
				description: 'Register a webhook',
				action: 'Register webhook',
			},
			{
				name: 'List Webhooks',
				value: 'listWebhooks',
				description: 'List all registered webhooks',
				action: 'List webhooks',
			},
			{
				name: 'Update Webhook',
				value: 'updateWebhook',
				description: 'Update a webhook',
				action: 'Update webhook',
			},
			{
				name: 'Remove Webhook',
				value: 'removeWebhook',
				description: 'Remove a webhook',
				action: 'Remove webhook',
			},
		],
		default: 'listWebhooks',
	},
	{
		displayName: 'Webhook URL',
		name: 'webhookUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['registerWebhook', 'updateWebhook'],
			},
		},
		description: 'The webhook URL to register',
		placeholder: 'https://example.com/webhook',
	},
	{
		displayName: 'Webhook Events',
		name: 'webhookEvents',
		type: 'multiOptions',
		default: [],
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['registerWebhook', 'updateWebhook'],
			},
		},
		description: 'Events to listen for',
		options: [
			{
				name: 'Acknowledgement',
				value: 'onAck',
			},
			{
				name: 'Add To Group',
				value: 'onAddedToGroup',
			},
			{
				name: 'Any Message',
				value: 'onAnyMessage',
			},
			{
				name: 'Battery',
				value: 'onBattery',
			},
			{
				name: 'Broadcast',
				value: 'onBroadcast',
			},
			{
				name: 'Button',
				value: 'onButton',
			},
			{
				name: 'Call State',
				value: 'onCallState',
			},
			{
				name: 'Chat Deleted',
				value: 'onChatDeleted',
			},
			{
				name: 'Chat Opened',
				value: 'onChatOpened',
			},
			{
				name: 'Chat State',
				value: 'onChatState',
			},
			{
				name: 'Contact Added',
				value: 'onContactAdded',
			},
			{
				name: 'Global Participants Changed',
				value: 'onGlobalParticipantsChanged',
			},
			{
				name: 'Group Approval Request',
				value: 'onGroupApprovalRequest',
			},
			{
				name: 'Group Change',
				value: 'onGroupChange',
			},
			{
				name: 'Incoming Call',
				value: 'onIncomingCall',
			},
			{
				name: 'Label',
				value: 'onLabel',
			},
			{
				name: 'Logout',
				value: 'onLogout',
			},
			{
				name: 'Message',
				value: 'onMessage',
			},
			{
				name: 'Message Deleted',
				value: 'onMessageDeleted',
			},
			{
				name: 'New Product',
				value: 'onNewProduct',
			},
			{
				name: 'Order',
				value: 'onOrder',
			},
			{
				name: 'Plugged',
				value: 'onPlugged',
			},
			{
				name: 'Poll Vote',
				value: 'onPollVote',
			},
			{
				name: 'Reaction',
				value: 'onReaction',
			},
			{
				name: 'Removed From Group',
				value: 'onRemovedFromGroup',
			},
			{
				name: 'State Changed',
				value: 'onStateChanged',
			},
			{
				name: 'Story',
				value: 'onStory',
			},
		],
	},
	{
		displayName: 'Webhook ID',
		name: 'webhookId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['webhook'],
				operation: ['updateWebhook', 'removeWebhook'],
			},
		},

		placeholder: 'webhook_id_123',
	},
];

export async function webhookOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<unknown> {
	switch (operation) {
		case 'registerWebhook': {
			const webhookUrl = this.getNodeParameter('webhookUrl', itemIndex) as string;
			const events = this.getNodeParameter('webhookEvents', itemIndex) as string[];

			const response = await openwaApiRequest.call(this, 'POST', '/registerWebhook', {
				url: webhookUrl,
				events,
			});

			return response;
		}

		case 'listWebhooks': {
			const response = await openwaApiRequest.call(this, 'POST', '/listWebhooks');

			return response;
		}

		case 'updateWebhook': {
			const webhookId = this.getNodeParameter('webhookId', itemIndex) as string;
			const webhookUrl = this.getNodeParameter('webhookUrl', itemIndex) as string;
			const events = this.getNodeParameter('webhookEvents', itemIndex) as string[];

			const response = await openwaApiRequest.call(this, 'POST', '/updateWebhook', {
				webhookId,
				url: webhookUrl,
				events,
			});

			return response;
		}

		case 'removeWebhook': {
			const webhookId = this.getNodeParameter('webhookId', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/removeWebhook', { webhookId });

			return response;
		}

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Unknown operation: ${operation}`,
			);
	}
}
