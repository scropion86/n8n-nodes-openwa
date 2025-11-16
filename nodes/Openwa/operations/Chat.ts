import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export const chatFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['chat'],
			},
		},
		options: [
			{
				name: 'Archive Chat',
				value: 'archiveChat',
				description: 'Archive a chat',
				action: 'Archive chat',
			},
			{
				name: 'Clear Chat',
				value: 'clearChat',
				description: 'Clear all messages from a chat',
				action: 'Clear chat',
			},
			{
				name: 'Delete Chat',
				value: 'deleteChat',
				description: 'Delete a chat',
				action: 'Delete chat',
			},
			{
				name: 'Get All Chats',
				value: 'getAllChats',
				action: 'Get all chats',
			},
			{
				name: 'Get All Messages In Chat',
				value: 'getAllMessagesInChat',
				description: 'Get all messages in a chat',
				action: 'Get all messages in chat',
			},
			{
				name: 'Get Chat',
				value: 'getChat',
				description: 'Get a specific chat',
				action: 'Get chat',
			},
			{
				name: 'Mark All Read',
				value: 'markAllRead',
				description: 'Mark all messages as read',
				action: 'Mark all as read',
			},
			{
				name: 'Mute Chat',
				value: 'muteChat',
				description: 'Mute a chat',
				action: 'Mute chat',
			},
			{
				name: 'Pin Chat',
				value: 'pinChat',
				description: 'Pin a chat',
				action: 'Pin chat',
			},
			{
				name: 'Unarchive Chat',
				value: 'unarchiveChat',
				description: 'Unarchive a chat',
				action: 'Unarchive chat',
			},
			{
				name: 'Unmute Chat',
				value: 'unmuteChat',
				description: 'Unmute a chat',
				action: 'Unmute chat',
			},
		],
		default: 'getAllChats',
	},
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['getChat', 'archiveChat', 'deleteChat', 'muteChat', 'unmuteChat', 'pinChat', 'clearChat', 'getAllMessagesInChat'],
			},
		},

		placeholder: '1234567890@c.us',
	},
	{
		displayName: 'Duration (Minutes)',
		name: 'duration',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['chat'],
				operation: ['muteChat'],
			},
		},
		description: 'Duration in minutes to mute (0 = forever)',
	},
];

export async function chatOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<unknown> {
	const credentials = await this.getCredentials('openwaApi');
	const baseUrl = (credentials.apiBaseUrl as string).replace(/\/$/, '');
	const apiKey = credentials.apiKey as string;

	const headers = {
		api_key: apiKey,
		'Content-Type': 'application/json',
	};

	switch (operation) {
		case 'getAllChats': {
			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/getAllChats`,
				headers,
				json: true,
				body: { args: {} },
			});

			return response;
		}

		case 'getChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/getChat`,
				headers,
				json: true,
				body: { args: { chatId } },
			});

			return response;
		}

		case 'archiveChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/archiveChat`,
				headers,
				json: true,
				body: { args: { chatId } },
			});

			return response;
		}

		case 'unarchiveChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/unarchiveChat`,
				headers,
				json: true,
				body: { args: { chatId } },
			});

			return response;
		}

		case 'deleteChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/deleteChat`,
				headers,
				json: true,
				body: { args: { chatId } },
			});

			return response;
		}

		case 'muteChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;
			const duration = this.getNodeParameter('duration', itemIndex) as number;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/muteChat`,
				headers,
				json: true,
				body: { args: {
					chatId,
					unmuteDate: duration ? Date.now() + duration * 60 * 1000 : 0,
				} },
			});

			return response;
		}

		case 'unmuteChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/unmuteChat`,
				headers,
				json: true,
				body: { args: { chatId } },
			});

			return response;
		}

		case 'pinChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/pinChat`,
				headers,
				json: true,
				body: { args: { chatId } },
			});

			return response;
		}

		case 'clearChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/clearChat`,
				headers,
				json: true,
				body: { args: { chatId } },
			});

			return response;
		}

		case 'getAllMessagesInChat': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/getAllMessagesInChat`,
				headers,
				json: true,
				body: { args: { chatId } },
			});

			return response;
		}

		case 'markAllRead': {
			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/markAllRead`,
				headers,
				json: true,
				body: { args: {} },
			});

			return response;
		}

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Unknown operation: ${operation}`,
			);
	}
}
