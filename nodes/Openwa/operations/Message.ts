import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export const messageFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['message'],
			},
		},
		options: [
			{
				name: 'Decrypt Media',
				value: 'decryptMedia',
				description: 'Decrypt a media message',
				action: 'Decrypt media',
			},
			{
				name: 'Delete Message',
				value: 'deleteMessage',
				description: 'Delete a message',
				action: 'Delete message',
			},
			{
				name: 'Edit Message',
				value: 'editMessage',
				description: 'Edit a message',
				action: 'Edit message',
			},
			{
				name: 'Get Message Info',
				value: 'getMessageInfo',
				description: 'Get information about a message',
				action: 'Get message info',
			},
			{
				name: 'React',
				value: 'react',
				description: 'Add a reaction to a message',
				action: 'React to message',
			},
			{
				name: 'Reply',
				value: 'reply',
				description: 'Reply to a message',
				action: 'Reply to message',
			},
			{
				name: 'Send Audio',
				value: 'sendAudio',
				description: 'Send an audio message',
				action: 'Send audio message',
			},
			{
				name: 'Send File',
				value: 'sendFile',
				description: 'Send a file message',
				action: 'Send file message',
			},
			{
				name: 'Send Image',
				value: 'sendImage',
				description: 'Send an image message',
				action: 'Send image message',
			},
			{
				name: 'Send Text',
				value: 'sendText',
				description: 'Send a text message',
				action: 'Send text message',
			},
			{
				name: 'Send Video',
				value: 'sendVideo',
				description: 'Send a video message',
				action: 'Send video message',
			},
		],
		default: 'sendText',
	},
	// Send Text
	{
		displayName: 'Chat ID',
		name: 'chatId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendText', 'sendImage', 'sendAudio', 'sendFile', 'sendVideo', 'reply'],
			},
		},
		description: 'The chat ID to send the message to',
		placeholder: 'e.g., 1234567890@c.us or groupId',
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendText', 'reply'],
			},
		},
		description: 'The message text to send',
		typeOptions: { rows: 3 },
	},
	{
		displayName: 'Message To Decrypt',
		name: 'messageSerialized',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['decryptMedia'],
			},
		},
		description: 'Serialized MessageId or Message object to decrypt',
		placeholder: 'message_id_or_serialized_message',
	},
	{
		displayName: 'File URL',
		name: 'fileUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendImage', 'sendAudio', 'sendFile', 'sendVideo'],
			},
		},
		description: 'URL of the file to send',
		placeholder: 'https://example.com/image.jpg',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendFile', 'sendAudio', 'sendVideo'],
			},
		},
		description: 'File name for the message',
		placeholder: 'document.pdf',
	},
	{
		displayName: 'Caption',
		name: 'caption',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['sendImage', 'sendVideo'],
			},
		},
		description: 'Caption for the media message',
	},
	// Reply/Delete/React
	{
		displayName: 'Message ID',
		name: 'messageId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['deleteMessage', 'react', 'getMessageInfo', 'editMessage'],
			},
		},
		description: 'The message ID to interact with',
	},
	{
		displayName: 'Quoted Message ID',
		name: 'quotedMsgId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['reply'],
			},
		},
		description: 'The message ID to reply to (quoted message ID)',
		placeholder: 'false_447123456789@c.us_9C4D0965EA5C09D591334AB6BDB07FEB',
	},
	{
		displayName: 'Send Seen',
		name: 'sendSeen',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['reply'],
			},
		},
		description: 'Whether to send a read receipt',
	},
	{
		displayName: 'Emoji',
		name: 'emoji',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['react'],
			},
		},
		description: 'The emoji to react with',
		placeholder: '😂',
	},
	{
		displayName: 'Edit Text',
		name: 'editText',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['message'],
				operation: ['editMessage'],
			},
		},
		description: 'New text for the edited message',
		typeOptions: { rows: 3 },
	},
];

export async function messageOperations(
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
		case 'sendText': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;
			const message = this.getNodeParameter('message', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/sendText`,
				headers,
				json: true,
				body: { args: {
					to: chatId,
					content: message,
				} },
			});

			return response;
		}

		case 'sendImage': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;
			const fileUrl = this.getNodeParameter('fileUrl', itemIndex) as string;
			const caption = this.getNodeParameter('caption', itemIndex) as string | undefined;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/sendImage`,
				headers,
				json: true,
				body: { args: {
					to: chatId,
					file: fileUrl,
					caption: caption || '',
				} },
			});

			return response;
		}

		case 'sendAudio': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;
			const fileUrl = this.getNodeParameter('fileUrl', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/sendAudio`,
				headers,
				json: true,
				body: { args: {
					to: chatId,
					file: fileUrl,
				} },
			});

			return response;
		}

		case 'sendFile': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;
			const fileUrl = this.getNodeParameter('fileUrl', itemIndex) as string;
			const fileName = this.getNodeParameter('fileName', itemIndex) as string | undefined;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/sendFile`,
				headers,
				json: true,
				body: { args: {
					to: chatId,
					file: fileUrl,
					filename: fileName || 'file',
				} },
			});

			return response;
		}

		case 'sendVideo': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;
			const fileUrl = this.getNodeParameter('fileUrl', itemIndex) as string;
			const caption = this.getNodeParameter('caption', itemIndex) as string | undefined;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/sendVideoAsGif`,
				headers,
				json: true,
				body: { args: {
					to: chatId,
					file: fileUrl,
					caption: caption || '',
				} },
			});

			return response;
		}

		case 'reply': {
			const chatId = this.getNodeParameter('chatId', itemIndex) as string;
			const quotedMsgId = this.getNodeParameter('quotedMsgId', itemIndex) as string;
			const message = this.getNodeParameter('message', itemIndex) as string;
			const sendSeen = this.getNodeParameter('sendSeen', itemIndex) as boolean;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/reply`,
				headers,
				json: true,
				body: { args: {
					to: chatId,
					content: message,
					quotedMsgId,
					sendSeen,
				} },
			});

			return response;
		}

		case 'deleteMessage': {
			const messageId = this.getNodeParameter('messageId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/deleteMessage`,
				headers,
				json: true,
				body: { args: { id: messageId } },
			});

			return response;
		}

		case 'editMessage': {
			const messageId = this.getNodeParameter('messageId', itemIndex) as string;
			const editText = this.getNodeParameter('editText', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/editMessage`,
				headers,
				json: true,
				body: { args: {
					id: messageId,
					newText: editText,
				} },
			});

			return response;
		}

		case 'react': {
			const messageId = this.getNodeParameter('messageId', itemIndex) as string;
			const emoji = this.getNodeParameter('emoji', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/react`,
				headers,
				json: true,
				body: { args: {
					id: messageId,
					emoji,
				} },
			});

			return response;
		}

		case 'getMessageInfo': {
			const messageId = this.getNodeParameter('messageId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/getMessageInfo`,
				headers,
				json: true,
				body: { args: { id: messageId } },
			});

			return response;
		}

		case 'decryptMedia': {
			const messageSerialized = this.getNodeParameter('messageSerialized', itemIndex) as string;

			const args: Record<string, unknown> = {};
			if (messageSerialized) {
				// pass the serialized message id or the whole message object string
				args.message = messageSerialized;
			}

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/decryptMedia`,
				headers,
				json: true,
				body: { args },
			});

			// response is expected to contain a DataURL, e.g. "data:image/png;base64,..."
			const responseTyped = response as Record<string, unknown> | string | null;
			let dataUrl: string | undefined;
			if (responseTyped && typeof responseTyped === 'object' && 'response' in responseTyped) {
				dataUrl = responseTyped['response'] as string;
			} else if (typeof responseTyped === 'string') {
				dataUrl = responseTyped;
			} else if (responseTyped && typeof responseTyped === 'object') {
				// fallback: try to stringify
				dataUrl = JSON.stringify(responseTyped);
			}

			const dataUrlStr = dataUrl || '';
			const commaIndex = dataUrlStr.indexOf(',');
			const base64 = commaIndex !== -1 ? dataUrlStr.slice(commaIndex + 1) : dataUrlStr;
			const mimeMatch = dataUrlStr.match(/^data:([^;]+);base64,/);
			const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
			const fileName = 'snapshot.png';

			// Determine success value if available in response
			const successValue =
				responseTyped && typeof responseTyped === 'object' && 'success' in responseTyped
					? Boolean(responseTyped['success'])
					: true;

			// Return both JSON (with DataURL & base64) and a binary property containing the base64 data
			const item = {
				json: {
					success: successValue,
					dataUrl: dataUrlStr,
					base64,
				},
				binary: {
					file: {
						data: base64,
						fileName,
						mimeType,
					},
				},
			};

			return [item];
		}

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Unknown operation: ${operation}`,
			);
	}
}
