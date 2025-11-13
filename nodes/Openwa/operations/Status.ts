import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export const statusFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['status'],
			},
		},
		options: [
			{
				name: 'Delete Status',
				value: 'deleteStatus',
				description: 'Delete a status',
				action: 'Delete status',
			},
			{
				name: 'Get My Status Array',
				value: 'getMyStatusArray',
				description: 'Get all your statuses',
				action: 'Get my status array',
			},
			{
				name: 'Get Status',
				value: 'getStatus',
				description: 'Get a specific status',
				action: 'Get status',
			},
			{
				name: 'Post Image Status',
				value: 'postImageStatus',
				description: 'Post an image status',
				action: 'Post image status',
			},
			{
				name: 'Post Text Status',
				value: 'postTextStatus',
				description: 'Post a text status',
				action: 'Post text status',
			},
			{
				name: 'Post Video Status',
				value: 'postVideoStatus',
				description: 'Post a video status',
				action: 'Post video status',
			},
		],
		default: 'postTextStatus',
	},
	{
		displayName: 'Status Text',
		name: 'statusText',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['postTextStatus'],
			},
		},
		description: 'The text for the status',
		typeOptions: { rows: 3 },
	},
	{
		displayName: 'Image URL',
		name: 'imageUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['postImageStatus'],
			},
		},
		description: 'URL of the image to post as status',
		placeholder: 'https://example.com/image.jpg',
	},
	{
		displayName: 'Video URL',
		name: 'videoUrl',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['postVideoStatus'],
			},
		},
		description: 'URL of the video to post as status',
		placeholder: 'https://example.com/video.mp4',
	},
	{
		displayName: 'Status ID',
		name: 'statusId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['status'],
				operation: ['deleteStatus', 'getStatus'],
			},
		},

		placeholder: 'status_id_123',
	},
];

export async function statusOperations(
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
		case 'postTextStatus': {
			const statusText = this.getNodeParameter('statusText', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/postTextStatus`,
				headers,
				json: true,
				body: { args: {
					text: statusText,
				} },
			});

			return response;
		}

		case 'postImageStatus': {
			const imageUrl = this.getNodeParameter('imageUrl', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/postImageStatus`,
				headers,
				json: true,
				body: { args: { imageUrl } },
			});

			return response;
		}

		case 'postVideoStatus': {
			const videoUrl = this.getNodeParameter('videoUrl', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/postVideoStatus`,
				headers,
				json: true,
				body: { args: { videoUrl } },
			});

			return response;
		}

		case 'getMyStatusArray': {
			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/getMyStatusArray`,
				headers,
				json: true,
				body: { args: {} },
			});

			return response;
		}

		case 'deleteStatus': {
			const statusId = this.getNodeParameter('statusId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/deleteStatus`,
				headers,
				json: true,
				body: { args: { statusId } },
			});

			return response;
		}

		case 'getStatus': {
			const statusId = this.getNodeParameter('statusId', itemIndex) as string;

			const response = await this.helpers.httpRequest({
				method: 'POST',
				url: `${baseUrl}/getStatus`,
				headers,
				json: true,
				body: { args: { statusId } },
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
