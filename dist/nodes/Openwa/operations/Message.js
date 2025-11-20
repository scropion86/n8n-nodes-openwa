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
                name: 'Forward Messages',
                value: 'forwardMessages',
                description: 'Forward messages to a chat',
                action: 'Forward messages',
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
                name: 'Send Contact',
                value: 'sendContact',
                description: 'Send a contact',
                action: 'Send contact',
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
                name: 'Send Image as Sticker',
                value: 'sendImageAsSticker',
                description: 'Send an image as a sticker',
                action: 'Send image as sticker',
            },
            {
                name: 'Send List Message',
                value: 'sendListMessage',
                description: 'Send a list message',
                action: 'Send list message',
            },
            {
                name: 'Send Location',
                value: 'sendLocation',
                description: 'Send a location message',
                action: 'Send location',
            },
            {
                name: 'Send Poll',
                value: 'sendPoll',
                description: 'Send a poll',
                action: 'Send poll',
            },
            {
                name: 'Send Seen',
                value: 'sendSeen',
                description: 'Send a read receipt',
                action: 'Send seen',
            },
            {
                name: 'Send Sticker From URL',
                value: 'sendStickerfromUrl',
                description: 'Send a sticker from a URL',
                action: 'Send sticker from url',
            },
            {
                name: 'Send Text',
                value: 'sendText',
                description: 'Send a text message',
                action: 'Send text message',
            },
            {
                name: 'Send VCard',
                value: 'sendVCard',
                description: 'Send a VCard',
                action: 'Send vcard',
            },
            {
                name: 'Send Video',
                value: 'sendVideo',
                description: 'Send a video message',
                action: 'Send video message',
            },
            {
                name: 'Send YouTube Link',
                value: 'sendYoutubeLink',
                description: 'Send a YouTube link',
                action: 'Send youtube link',
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
                operation: ['sendImage', 'sendAudio', 'sendFile', 'sendVideo', 'sendImageAsSticker', 'sendStickerfromUrl'],
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
    {
        displayName: 'Message IDs',
        name: 'messageIds',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['forwardMessages'],
            },
        },
        description: 'Comma-separated list of message IDs to forward',
    },
    {
        displayName: 'Skip My Messages',
        name: 'skipMyMessages',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['forwardMessages'],
            },
        },
        description: 'Whether to skip forwarding your own messages',
    },
    {
        displayName: 'Contact ID',
        name: 'contactId',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendContact'],
            },
        },
        description: 'The contact ID to send',
    },
    {
        displayName: 'Title',
        name: 'title',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendListMessage'],
            },
        },
        description: 'Title of the list message',
    },
    {
        displayName: 'Description',
        name: 'description',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendListMessage'],
            },
        },
        description: 'Description of the list message',
    },
    {
        displayName: 'Button Text',
        name: 'buttonText',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendListMessage'],
            },
        },
        description: 'Text for the button',
    },
    {
        displayName: 'Sections',
        name: 'sections',
        type: 'json',
        default: '[]',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendListMessage'],
            },
        },
        description: 'Sections for the list message',
    },
    {
        displayName: 'Latitude',
        name: 'latitude',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendLocation'],
            },
        },
        description: 'Latitude of the location',
    },
    {
        displayName: 'Longitude',
        name: 'longitude',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendLocation'],
            },
        },
        description: 'Longitude of the location',
    },
    {
        displayName: 'Location Text',
        name: 'locationText',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendLocation'],
            },
        },
        description: 'Text to display with the location',
    },
    {
        displayName: 'Poll Name',
        name: 'pollName',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendPoll'],
            },
        },
        description: 'Name of the poll',
    },
    {
        displayName: 'Poll Options',
        name: 'pollOptions',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendPoll'],
            },
        },
        description: 'Comma-separated list of poll options',
    },
    {
        displayName: 'Allow Multi Select',
        name: 'allowMultiSelect',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendPoll'],
            },
        },
        description: 'Whether to allow multiple selections in the poll',
    },
    {
        displayName: 'VCard',
        name: 'vcard',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendVCard'],
            },
        },
        description: 'VCard data',
    },
    {
        displayName: 'Contact Name',
        name: 'contactName',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendVCard'],
            },
        },
        description: 'Name of the contact',
    },
    {
        displayName: 'Contact Number',
        name: 'contactNumber',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendVCard'],
            },
        },
        description: 'Number of the contact',
    },
    {
        displayName: 'Video URL',
        name: 'videoUrl',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['message'],
                operation: ['sendYoutubeLink'],
            },
        },
        description: 'URL of the YouTube video',
    },
];
const ApiRequest_1 = require("../transport/ApiRequest");
async function messageOperations(operation, itemIndex) {
    switch (operation) {
        case 'sendText': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const message = this.getNodeParameter('message', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendText', {
                to: chatId,
                content: message,
            });
            return response;
        }
        case 'sendImage': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const caption = this.getNodeParameter('caption', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendImage', {
                to: chatId,
                file: fileUrl,
                caption: caption || '',
            });
            return response;
        }
        case 'sendAudio': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendAudio', {
                to: chatId,
                file: fileUrl,
            });
            return response;
        }
        case 'sendFile': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const fileName = this.getNodeParameter('fileName', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendFile', {
                to: chatId,
                file: fileUrl,
                filename: fileName || 'file',
            });
            return response;
        }
        case 'sendVideo': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const caption = this.getNodeParameter('caption', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendVideoAsGif', {
                to: chatId,
                file: fileUrl,
                caption: caption || '',
            });
            return response;
        }
        case 'reply': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const quotedMsgId = this.getNodeParameter('quotedMsgId', itemIndex);
            const message = this.getNodeParameter('message', itemIndex);
            const sendSeen = this.getNodeParameter('sendSeen', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/reply', {
                to: chatId,
                content: message,
                quotedMsgId,
                sendSeen,
            });
            return response;
        }
        case 'deleteMessage': {
            const messageId = this.getNodeParameter('messageId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/deleteMessage', { id: messageId });
            return response;
        }
        case 'editMessage': {
            const messageId = this.getNodeParameter('messageId', itemIndex);
            const editText = this.getNodeParameter('editText', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/editMessage', {
                id: messageId,
                newText: editText,
            });
            return response;
        }
        case 'react': {
            const messageId = this.getNodeParameter('messageId', itemIndex);
            const emoji = this.getNodeParameter('emoji', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/react', {
                id: messageId,
                emoji,
            });
            return response;
        }
        case 'getMessageInfo': {
            const messageId = this.getNodeParameter('messageId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getMessageInfo', { id: messageId });
            return response;
        }
        case 'decryptMedia': {
            const messageSerialized = this.getNodeParameter('messageSerialized', itemIndex);
            const args = {};
            if (messageSerialized) {
                args.message = messageSerialized;
            }
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/decryptMedia', args);
            const responseTyped = response;
            let dataUrl;
            if (responseTyped && typeof responseTyped === 'object' && 'response' in responseTyped) {
                dataUrl = responseTyped['response'];
            }
            else if (typeof responseTyped === 'string') {
                dataUrl = responseTyped;
            }
            else if (responseTyped && typeof responseTyped === 'object') {
                dataUrl = JSON.stringify(responseTyped);
            }
            const dataUrlStr = dataUrl || '';
            const commaIndex = dataUrlStr.indexOf(',');
            const base64 = commaIndex !== -1 ? dataUrlStr.slice(commaIndex + 1) : dataUrlStr;
            const mimeMatch = dataUrlStr.match(/^data:([^;]+);base64,/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'application/octet-stream';
            const fileName = 'snapshot.png';
            const successValue = responseTyped && typeof responseTyped === 'object' && 'success' in responseTyped
                ? Boolean(responseTyped['success'])
                : true;
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
        case 'forwardMessages': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const messageIds = this.getNodeParameter('messageIds', itemIndex);
            const skipMyMessages = this.getNodeParameter('skipMyMessages', itemIndex);
            let messages = messageIds;
            if (typeof messageIds === 'string' && messageIds.includes(',')) {
                messages = messageIds.split(',').map((id) => id.trim());
            }
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/forwardMessages', {
                to: chatId,
                messages,
                skipMyMessages,
            });
            return response;
        }
        case 'sendContact': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const contactId = this.getNodeParameter('contactId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendContact', {
                to: chatId,
                contactId,
            });
            return response;
        }
        case 'sendImageAsSticker': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendImageAsSticker', {
                to: chatId,
                image: fileUrl,
            });
            return response;
        }
        case 'sendListMessage': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const title = this.getNodeParameter('title', itemIndex);
            const description = this.getNodeParameter('description', itemIndex);
            const buttonText = this.getNodeParameter('buttonText', itemIndex);
            const sectionsJson = this.getNodeParameter('sections', itemIndex);
            let sections = [];
            if (typeof sectionsJson === 'string') {
                try {
                    sections = JSON.parse(sectionsJson);
                }
                catch {
                }
            }
            else {
                sections = sectionsJson;
            }
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendListMessage', {
                to: chatId,
                title,
                description,
                actionText: buttonText,
                sections,
            });
            return response;
        }
        case 'sendLocation': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const latitude = this.getNodeParameter('latitude', itemIndex);
            const longitude = this.getNodeParameter('longitude', itemIndex);
            const locationText = this.getNodeParameter('locationText', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendLocation', {
                to: chatId,
                lat: latitude,
                lng: longitude,
                loc: locationText,
            });
            return response;
        }
        case 'sendPoll': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const pollName = this.getNodeParameter('pollName', itemIndex);
            const pollOptionsStr = this.getNodeParameter('pollOptions', itemIndex);
            const allowMultiSelect = this.getNodeParameter('allowMultiSelect', itemIndex);
            let options = [];
            if (pollOptionsStr) {
                options = pollOptionsStr.split(',').map((opt) => opt.trim());
            }
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendPoll', {
                to: chatId,
                name: pollName,
                options,
                allowMultiSelect,
            });
            return response;
        }
        case 'sendSeen': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendSeen', {
                to: chatId,
            });
            return response;
        }
        case 'sendStickerfromUrl': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const fileUrl = this.getNodeParameter('fileUrl', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendStickerfromUrl', {
                to: chatId,
                url: fileUrl,
            });
            return response;
        }
        case 'sendVCard': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const vcard = this.getNodeParameter('vcard', itemIndex);
            const contactName = this.getNodeParameter('contactName', itemIndex);
            const contactNumber = this.getNodeParameter('contactNumber', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendVCard', {
                to: chatId,
                vcard,
                contactName,
                contactNumber,
            });
            return response;
        }
        case 'sendYoutubeLink': {
            const chatId = this.getNodeParameter('chatId', itemIndex);
            const videoUrl = this.getNodeParameter('videoUrl', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/sendYoutubeLink', {
                to: chatId,
                url: videoUrl,
            });
            return response;
        }
        default:
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
    }
}
//# sourceMappingURL=Message.js.map