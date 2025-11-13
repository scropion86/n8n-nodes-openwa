"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookFields = void 0;
exports.webhookOperations = webhookOperations;
const n8n_workflow_1 = require("n8n-workflow");
exports.webhookFields = [
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
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['webhook'],
                operation: ['registerWebhook', 'updateWebhook'],
            },
        },
        description: 'Comma-separated list of events to listen for',
        placeholder: 'message,status,group_join',
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
async function webhookOperations(operation, itemIndex) {
    const credentials = await this.getCredentials('openwaApi');
    const baseUrl = credentials.apiBaseUrl.replace(/\/$/, '');
    const apiKey = credentials.apiKey;
    const headers = {
        api_key: apiKey,
        'Content-Type': 'application/json',
    };
    switch (operation) {
        case 'registerWebhook': {
            const webhookUrl = this.getNodeParameter('webhookUrl', itemIndex);
            const webhookEvents = this.getNodeParameter('webhookEvents', itemIndex);
            const events = webhookEvents.split(',').map((e) => e.trim());
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/registerWebhook`,
                headers,
                json: true,
                body: { args: {
                        url: webhookUrl,
                        events,
                    } },
            });
            return response;
        }
        case 'listWebhooks': {
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/listWebhooks`,
                headers,
                json: true,
                body: { args: {} },
            });
            return response;
        }
        case 'updateWebhook': {
            const webhookId = this.getNodeParameter('webhookId', itemIndex);
            const webhookUrl = this.getNodeParameter('webhookUrl', itemIndex);
            const webhookEvents = this.getNodeParameter('webhookEvents', itemIndex);
            const events = webhookEvents.split(',').map((e) => e.trim());
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/updateWebhook`,
                headers,
                json: true,
                body: { args: {
                        webhookId,
                        url: webhookUrl,
                        events,
                    } },
            });
            return response;
        }
        case 'removeWebhook': {
            const webhookId = this.getNodeParameter('webhookId', itemIndex);
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/removeWebhook`,
                headers,
                json: true,
                body: { args: { webhookId } },
            });
            return response;
        }
        default:
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
    }
}
//# sourceMappingURL=Webhook.js.map