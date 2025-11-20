"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookFields = void 0;
exports.webhookOperations = webhookOperations;
const n8n_workflow_1 = require("n8n-workflow");
const ApiRequest_1 = require("../transport/ApiRequest");
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
async function webhookOperations(operation, itemIndex) {
    switch (operation) {
        case 'registerWebhook': {
            const webhookUrl = this.getNodeParameter('webhookUrl', itemIndex);
            const events = this.getNodeParameter('webhookEvents', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/registerWebhook', {
                url: webhookUrl,
                events,
            });
            return response;
        }
        case 'listWebhooks': {
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/listWebhooks');
            return response;
        }
        case 'updateWebhook': {
            const webhookId = this.getNodeParameter('webhookId', itemIndex);
            const webhookUrl = this.getNodeParameter('webhookUrl', itemIndex);
            const events = this.getNodeParameter('webhookEvents', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/updateWebhook', {
                webhookId,
                url: webhookUrl,
                events,
            });
            return response;
        }
        case 'removeWebhook': {
            const webhookId = this.getNodeParameter('webhookId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/removeWebhook', { webhookId });
            return response;
        }
        default:
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
    }
}
//# sourceMappingURL=Webhook.js.map