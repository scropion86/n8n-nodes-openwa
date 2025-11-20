"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatFields = void 0;
exports.chatOperations = chatOperations;
const n8n_workflow_1 = require("n8n-workflow");
exports.chatFields = [
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
const ApiRequest_1 = require("../transport/ApiRequest");
async function chatOperations(operation, itemIndex) {
    switch (operation) {
        case 'getAllChats': {
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getAllChats');
            return response;
            return response;
        }
        case 'getChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getChat', { chatId });
            return response;
            return response;
        }
        case 'archiveChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/archiveChat', { chatId });
            return response;
            return response;
        }
        case 'unarchiveChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/unarchiveChat', { chatId });
            return response;
            return response;
        }
        case 'deleteChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/deleteChat', { chatId });
            return response;
            return response;
        }
        case 'muteChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const duration = this.getNodeParameter('duration', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/muteChat', {
                chatId,
                unmuteDate: duration ? Date.now() + duration * 60 * 1000 : 0,
            });
            return response;
            return response;
        }
        case 'unmuteChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/unmuteChat', { chatId });
            return response;
            return response;
        }
        case 'pinChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/pinChat', { chatId });
            return response;
            return response;
        }
        case 'clearChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/clearChat', { chatId });
            return response;
            return response;
        }
        case 'getAllMessagesInChat': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getAllMessagesInChat', { chatId });
            return response;
            return response;
        }
        case 'markAllRead': {
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/markAllRead');
            return response;
            return response;
        }
        default:
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
    }
}
//# sourceMappingURL=Chat.js.map