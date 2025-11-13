"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageFields = void 0;
exports.messageOperations = messageOperations;
const n8n_workflow_1 = require("n8n-workflow");
exports.messageFields = [
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
    {
        displayName: 'Message ID',
        name: 'messageId',
        type: 'string',
        required: true,
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['deleteMessage', 'react', 'getMessageInfo', 'editMessage', 'reply'],
            },
        },
        description: 'The message ID to interact with',
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
async function messageOperations(operation, itemIndex) {
    const credentials = await this.getCredentials('openwaApi');
    const baseUrl = credentials.apiBaseUrl.replace(/\/$/, '');
    const apiKey = credentials.apiKey;
    const headers = {
        api_key: apiKey,
        'Content-Type': 'application/json',
    };
    switch (operation) {
        case 'sendText': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const message = this.getNodeParameter('message', itemIndex);
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
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const caption = this.getNodeParameter('caption', itemIndex);
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
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
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
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const fileName = this.getNodeParameter('fileName', itemIndex);
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
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const caption = this.getNodeParameter('caption', itemIndex);
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
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const messageId = this.getNodeParameter('messageId', itemIndex);
            const message = this.getNodeParameter('message', itemIndex);
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/reply`,
                headers,
                json: true,
                body: { args: {
                        to: chatId,
                        id: messageId,
                        content: message,
                    } },
            });
            return response;
        }
        case 'deleteMessage': {
            const messageId = this.getNodeParameter('messageId', itemIndex);
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
            const messageId = this.getNodeParameter('messageId', itemIndex);
            const editText = this.getNodeParameter('editText', itemIndex);
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
            const messageId = this.getNodeParameter('messageId', itemIndex);
            const emoji = this.getNodeParameter('emoji', itemIndex);
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
            const messageId = this.getNodeParameter('messageId', itemIndex);
            const response = await this.helpers.httpRequest({
                method: 'POST',
                url: `${baseUrl}/getMessageInfo`,
                headers,
                json: true,
                body: { args: { id: messageId } },
            });
            return response;
        }
        default:
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
    }
}
//# sourceMappingURL=Message.js.map