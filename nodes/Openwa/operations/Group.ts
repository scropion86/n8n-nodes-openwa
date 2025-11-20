import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export const groupFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['group'],
			},
		},
		options: [
			{
				name: 'Add Participant',
				value: 'addParticipant',
				description: 'Add a participant to a group',
				action: 'Add participant',
			},
			{
				name: 'Create Group',
				value: 'createGroup',
				description: 'Create a new group',
				action: 'Create group',
			},
			{
				name: 'Demote Participant',
				value: 'demoteParticipant',
				description: 'Demote a participant from admin',
				action: 'Demote participant',
			},
			{
				name: 'Get All Groups',
				value: 'getAllGroups',
				action: 'Get all groups',
			},
			{
				name: 'Get Group Info',
				value: 'getGroupInfo',
				description: 'Get group information',
				action: 'Get group info',
			},
			{
				name: 'Leave Group',
				value: 'leaveGroup',
				description: 'Leave a group',
				action: 'Leave group',
			},
			{
				name: 'Promote Participant',
				value: 'promoteParticipant',
				description: 'Promote a participant to admin',
				action: 'Promote participant',
			},
			{
				name: 'Remove Participant',
				value: 'removeParticipant',
				description: 'Remove a participant from a group',
				action: 'Remove participant',
			},
			{
				name: 'Set Group Description',
				value: 'setGroupDescription',
				action: 'Set group description',
			},
			{
				name: 'Set Group Title',
				value: 'setGroupTitle',
				action: 'Set group title',
			},
		],
		default: 'getAllGroups',
	},
	{
		displayName: 'Group ID',
		name: 'groupId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['getGroupInfo', 'addParticipant', 'removeParticipant', 'promoteParticipant', 'demoteParticipant', 'leaveGroup', 'setGroupTitle', 'setGroupDescription'],
			},
		},

		placeholder: '123456789-987654321@g.us',
	},
	{
		displayName: 'Group Title',
		name: 'groupTitle',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup', 'setGroupTitle'],
			},
		},
		description: 'The group title/name',
	},
	{
		displayName: 'Participant Numbers',
		name: 'participants',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['createGroup', 'addParticipant'],
			},
		},
		description: 'Comma-separated phone numbers (e.g., 1234567890,0987654321)',
		placeholder: '1234567890,0987654321',
	},
	{
		displayName: 'Participant Number',
		name: 'participantNumber',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['removeParticipant', 'promoteParticipant', 'demoteParticipant'],
			},
		},
		description: 'The participant phone number',
		placeholder: '1234567890',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['group'],
				operation: ['setGroupDescription'],
			},
		},
		description: 'Group description',
		typeOptions: { rows: 3 },
	},
];

import { openwaApiRequest } from '../transport/ApiRequest';

export async function groupOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<unknown> {

	switch (operation) {
		case 'createGroup': {
			const groupTitle = this.getNodeParameter('groupTitle', itemIndex) as string;
			const participants = this.getNodeParameter('participants', itemIndex) as string;

			const participantList = participants.split(',').map((p) => p.trim());

			const response = await openwaApiRequest.call(this, 'POST', '/createGroup', {
				title: groupTitle,
				participants: participantList,
			});

			return response;

			return response;
		}

		case 'getAllGroups': {
			const response = await openwaApiRequest.call(this, 'POST', '/getAllGroups');

			return response;

			return response;
		}

		case 'getGroupInfo': {
			const groupId = this.getNodeParameter('groupId', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/getGroupInfo', { groupId });

			return response;

			return response;
		}

		case 'addParticipant': {
			const groupId = this.getNodeParameter('groupId', itemIndex) as string;
			const participants = this.getNodeParameter('participants', itemIndex) as string;

			const participantList = participants.split(',').map((p) => p.trim());

			const response = await openwaApiRequest.call(this, 'POST', '/addParticipant', {
				groupId,
				participants: participantList,
			});

			return response;

			return response;
		}

		case 'removeParticipant': {
			const groupId = this.getNodeParameter('groupId', itemIndex) as string;
			const participantNumber = this.getNodeParameter('participantNumber', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/removeParticipant', {
				groupId,
				participant: participantNumber,
			});

			return response;

			return response;
		}

		case 'promoteParticipant': {
			const groupId = this.getNodeParameter('groupId', itemIndex) as string;
			const participantNumber = this.getNodeParameter('participantNumber', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/promoteParticipant', {
				groupId,
				participant: participantNumber,
			});

			return response;

			return response;
		}

		case 'demoteParticipant': {
			const groupId = this.getNodeParameter('groupId', itemIndex) as string;
			const participantNumber = this.getNodeParameter('participantNumber', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/demoteParticipant', {
				groupId,
				participant: participantNumber,
			});

			return response;

			return response;
		}

		case 'leaveGroup': {
			const groupId = this.getNodeParameter('groupId', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/leaveGroup', { groupId });

			return response;

			return response;
		}

		case 'setGroupTitle': {
			const groupId = this.getNodeParameter('groupId', itemIndex) as string;
			const groupTitle = this.getNodeParameter('groupTitle', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/setGroupTitle', {
				groupId,
				title: groupTitle,
			});

			return response;

			return response;
		}

		case 'setGroupDescription': {
			const groupId = this.getNodeParameter('groupId', itemIndex) as string;
			const description = this.getNodeParameter('description', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/setGroupDescription', {
				groupId,
				description,
			});

			return response;

			return response;
		}

		default:
			throw new NodeOperationError(
				this.getNode(),
				`Unknown operation: ${operation}`,
			);
	}
}
