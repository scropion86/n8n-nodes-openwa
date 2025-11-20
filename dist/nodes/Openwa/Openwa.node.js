"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Openwa = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const Message_1 = require("./operations/Message");
const Chat_1 = require("./operations/Chat");
const Group_1 = require("./operations/Group");
const Contact_1 = require("./operations/Contact");
const Status_1 = require("./operations/Status");
const Webhook_1 = require("./operations/Webhook");
const System_1 = require("./operations/System");
class Openwa {
    constructor() {
        this.description = {
            displayName: 'Openwa',
            name: 'openwa',
            icon: 'file:openwa.svg',
            group: ['transform'],
            version: 1,
            subtitle: '={{$node.parameters.resource}}',
            description: 'Interact with Openwa API',
            defaults: {
                name: 'Openwa',
            },
            inputs: ['main'],
            outputs: ['main'],
            credentials: [
                {
                    name: 'openwaApi',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Resource',
                    name: 'resource',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Chat',
                            value: 'chat',
                            description: 'Manage chats',
                        },
                        {
                            name: 'Contact',
                            value: 'contact',
                            description: 'Manage contacts',
                        },
                        {
                            name: 'Group',
                            value: 'group',
                            description: 'Manage groups',
                        },
                        {
                            name: 'Message',
                            value: 'message',
                            description: 'Send and manage messages',
                        },
                        {
                            name: 'Status',
                            value: 'status',
                            description: 'Manage status updates',
                        },
                        {
                            name: 'System',
                            value: 'system',
                            description: 'System operations',
                        },
                        {
                            name: 'Webhook',
                            value: 'webhook',
                            description: 'Manage webhooks',
                        },
                    ],
                    default: 'message',
                },
                ...Message_1.messageFields,
                ...Chat_1.chatFields,
                ...Group_1.groupFields,
                ...Contact_1.contactFields,
                ...Status_1.statusFields,
                ...Webhook_1.webhookFields,
                ...System_1.systemFields,
            ],
            usableAsTool: true,
        };
    }
    async execute() {
        const items = this.getInputData();
        const returnData = [];
        const resource = this.getNodeParameter('resource', 0);
        const operation = this.getNodeParameter('operation', 0);
        for (let i = 0; i < items.length; i++) {
            try {
                let operationResult;
                if (resource === 'message') {
                    operationResult = await Message_1.messageOperations.call(this, operation, i);
                }
                else if (resource === 'chat') {
                    operationResult = await Chat_1.chatOperations.call(this, operation, i);
                }
                else if (resource === 'group') {
                    operationResult = await Group_1.groupOperations.call(this, operation, i);
                }
                else if (resource === 'contact') {
                    operationResult = await Contact_1.contactOperations.call(this, operation, i);
                }
                else if (resource === 'status') {
                    operationResult = await Status_1.statusOperations.call(this, operation, i);
                }
                else if (resource === 'webhook') {
                    operationResult = await Webhook_1.webhookOperations.call(this, operation, i);
                }
                else if (resource === 'system') {
                    operationResult = await System_1.systemOperations.call(this, operation, i);
                }
                else {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Resource "${resource}" is not known`);
                }
                const executionData = this.helpers.constructExecutionMetaData(this.helpers.returnJsonArray(operationResult), { itemData: { item: i } });
                returnData.push(...executionData);
            }
            catch (error) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error instanceof Error ? error.message : 'Unknown error occurred',
                        },
                        pairedItem: { item: i },
                    });
                }
                else {
                    throw error;
                }
            }
        }
        return [returnData];
    }
}
exports.Openwa = Openwa;
//# sourceMappingURL=Openwa.node.js.map