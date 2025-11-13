"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactFields = void 0;
exports.contactOperations = contactOperations;
const n8n_workflow_1 = require("n8n-workflow");
exports.contactFields = [
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
async function contactOperations(operation, itemIndex) {
    const credentials = await this.getCredentials('openwaApi');
    const baseUrl = credentials.apiBaseUrl.replace(/\/$/, '');
    const apiKey = credentials.apiKey;
    const headers = {
        api_key: apiKey,
        'Content-Type': 'application/json',
    };
    switch (operation) {
        case 'getAllContacts': {
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/getAllContacts`,
                headers,
                json: true,
                body: { args: {} },
            });
            return response;
        }
        case 'getContact': {
            const contactId = this.getNodeParameter('contactId', itemIndex);
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/getContact`,
                headers,
                json: true,
                body: { args: { contactId } },
            });
            return response;
        }
        case 'contactBlock': {
            const contactId = this.getNodeParameter('contactId', itemIndex);
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/contactBlock`,
                headers,
                json: true,
                body: { args: { contactId } },
            });
            return response;
        }
        case 'contactUnblock': {
            const contactId = this.getNodeParameter('contactId', itemIndex);
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/contactUnblock`,
                headers,
                json: true,
                body: { args: { contactId } },
            });
            return response;
        }
        case 'checkNumberStatus': {
            const contactId = this.getNodeParameter('contactId', itemIndex);
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/checkNumberStatus`,
                headers,
                json: true,
                body: { args: { contactId } },
            });
            return response;
        }
        case 'getBusinessProfile': {
            const contactId = this.getNodeParameter('contactId', itemIndex);
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/getBusinessProfile`,
                headers,
                json: true,
                body: { args: { contactId } },
            });
            return response;
        }
        default:
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
    }
}
//# sourceMappingURL=Contact.js.map