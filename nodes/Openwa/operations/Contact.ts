import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export const contactFields: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Block Contact',
				value: 'contactBlock',
				description: 'Block a contact',
				action: 'Block contact',
			},
			{
				name: 'Check Number Status',
				value: 'checkNumberStatus',
				description: 'Check if a number is registered on WhatsApp',
				action: 'Check number status',
			},
			{
				name: 'Get All Contacts',
				value: 'getAllContacts',
				action: 'Get all contacts',
			},
			{
				name: 'Get Business Profile',
				value: 'getBusinessProfile',
				description: 'Get business profile information',
				action: 'Get business profile',
			},
			{
				name: 'Get Contact',
				value: 'getContact',
				description: 'Get a specific contact',
				action: 'Get contact',
			},
			{
				name: 'Unblock Contact',
				value: 'contactUnblock',
				description: 'Unblock a contact',
				action: 'Unblock contact',
			},
		],
		default: 'getAllContacts',
	},
	{
		displayName: 'Contact ID or Phone',
		name: 'contactId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['getContact', 'contactBlock', 'contactUnblock', 'checkNumberStatus', 'getBusinessProfile'],
			},
		},
		description: 'The contact ID or phone number',
		placeholder: '1234567890@c.us',
	},
];

import { openwaApiRequest } from '../transport/ApiRequest';

export async function contactOperations(
	this: IExecuteFunctions,
	operation: string,
	itemIndex: number,
): Promise<unknown> {

	switch (operation) {
		case 'getAllContacts': {
			const response = await openwaApiRequest.call(this, 'POST', '/getAllContacts');

			return response;

			return response;
		}

		case 'getContact': {
			const contactId = this.getNodeParameter('contactId', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/getContact', { contactId });

			return response;

			return response;
		}

		case 'contactBlock': {
			const contactId = this.getNodeParameter('contactId', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/contactBlock', { contactId });

			return response;

			return response;
		}

		case 'contactUnblock': {
			const contactId = this.getNodeParameter('contactId', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/contactUnblock', { contactId });

			return response;

			return response;
		}

		case 'checkNumberStatus': {
			const contactId = this.getNodeParameter('contactId', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/checkNumberStatus', { contactId });

			return response;

			return response;
		}

		case 'getBusinessProfile': {
			const contactId = this.getNodeParameter('contactId', itemIndex) as string;

			const response = await openwaApiRequest.call(this, 'POST', '/getBusinessProfile', { contactId });

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
