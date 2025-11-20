"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupFields = void 0;
exports.groupOperations = groupOperations;
const n8n_workflow_1 = require("n8n-workflow");
exports.groupFields = [
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
                name: 'Approve Join Request',
                value: 'approveGroupJoinRequest',
                description: 'Approve a participant\'s request to join the group',
                action: 'Approve join request',
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
                name: 'Get Group Admins',
                value: 'getGroupAdmins',
                description: 'Get the admins of a group',
                action: 'Get group admins',
            },
            {
                name: 'Get Group Info',
                value: 'getGroupInfo',
                description: 'Get group information',
                action: 'Get group info',
            },
            {
                name: 'Get Group Invite Link',
                value: 'getGroupInviteLink',
                description: 'Get the invite link for a group',
                action: 'Get group invite link',
            },
            {
                name: 'Get Group Members',
                value: 'getGroupMembers',
                description: 'Get the members of a group',
                action: 'Get group members',
            },
            {
                name: 'Join Group via Link',
                value: 'joinGroupViaLink',
                description: 'Join a group using an invite link',
                action: 'Join group via link',
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
                name: 'Reject Join Request',
                value: 'rejectGroupJoinRequest',
                description: 'Reject a participant\'s request to join the group',
                action: 'Reject join request',
            },
            {
                name: 'Remove Participant',
                value: 'removeParticipant',
                description: 'Remove a participant from a group',
                action: 'Remove participant',
            },
            {
                name: 'Revoke Group Invite Link',
                value: 'revokeGroupInviteLink',
                description: 'Revoke the invite link for a group',
                action: 'Revoke group invite link',
            },
            {
                name: 'Set Group Description',
                value: 'setGroupDescription',
                action: 'Set group description',
            },
            {
                name: 'Set Group Edit to Admins Only',
                value: 'setGroupEditToAdminsOnly',
                description: 'Set whether only admins can edit group info',
                action: 'Set group edit to admins only',
            },
            {
                name: 'Set Group Title',
                value: 'setGroupTitle',
                action: 'Set group title',
            },
            {
                name: 'Set Group to Admins Only',
                value: 'setGroupToAdminsOnly',
                description: 'Set whether only admins can send messages',
                action: 'Set group to admins only',
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
                operation: ['getGroupInfo', 'addParticipant', 'removeParticipant', 'promoteParticipant', 'demoteParticipant', 'leaveGroup', 'setGroupTitle', 'setGroupDescription', 'getGroupAdmins', 'getGroupMembers', 'getGroupInviteLink', 'revokeGroupInviteLink', 'approveGroupJoinRequest', 'rejectGroupJoinRequest', 'setGroupToAdminsOnly', 'setGroupEditToAdminsOnly'],
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
                operation: ['removeParticipant', 'promoteParticipant', 'demoteParticipant', 'approveGroupJoinRequest', 'rejectGroupJoinRequest'],
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
    {
        displayName: 'Invite Link',
        name: 'inviteLink',
        type: 'string',
        default: '',
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['joinGroupViaLink'],
            },
        },
        description: 'The invite link to join the group',
    },
    {
        displayName: 'Admins Only',
        name: 'adminsOnly',
        type: 'boolean',
        default: false,
        displayOptions: {
            show: {
                resource: ['group'],
                operation: ['setGroupToAdminsOnly', 'setGroupEditToAdminsOnly'],
            },
        },
        description: 'Whether to enable the setting for admins only',
    },
];
const ApiRequest_1 = require("../transport/ApiRequest");
async function groupOperations(operation, itemIndex) {
    switch (operation) {
        case 'createGroup': {
            const groupTitle = this.getNodeParameter('groupTitle', itemIndex);
            const participants = this.getNodeParameter('participants', itemIndex);
            const participantList = participants.split(',').map((p) => p.trim());
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/createGroup', {
                title: groupTitle,
                participants: participantList,
            });
            return response;
            return response;
        }
        case 'getAllGroups': {
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getAllGroups');
            return response;
            return response;
        }
        case 'getGroupInfo': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getGroupInfo', { groupId });
            return response;
            return response;
        }
        case 'addParticipant': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const participants = this.getNodeParameter('participants', itemIndex);
            const participantList = participants.split(',').map((p) => p.trim());
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/addParticipant', {
                groupId,
                participants: participantList,
            });
            return response;
            return response;
        }
        case 'removeParticipant': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const participantNumber = this.getNodeParameter('participantNumber', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/removeParticipant', {
                groupId,
                participant: participantNumber,
            });
            return response;
            return response;
        }
        case 'promoteParticipant': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const participantNumber = this.getNodeParameter('participantNumber', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/promoteParticipant', {
                groupId,
                participant: participantNumber,
            });
            return response;
            return response;
        }
        case 'demoteParticipant': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const participantNumber = this.getNodeParameter('participantNumber', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/demoteParticipant', {
                groupId,
                participant: participantNumber,
            });
            return response;
            return response;
        }
        case 'leaveGroup': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/leaveGroup', { groupId });
            return response;
            return response;
        }
        case 'setGroupTitle': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const groupTitle = this.getNodeParameter('groupTitle', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/setGroupTitle', {
                groupId,
                title: groupTitle,
            });
            return response;
            return response;
        }
        case 'setGroupDescription': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const description = this.getNodeParameter('description', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/setGroupDescription', {
                groupId,
                description,
            });
            return response;
        }
        case 'getGroupAdmins': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getGroupAdmins', { groupId });
            return response;
        }
        case 'getGroupMembers': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getGroupMembers', { groupId });
            return response;
        }
        case 'getGroupInviteLink': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/getGroupInviteLink', { chatId: groupId });
            return response;
        }
        case 'revokeGroupInviteLink': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/revokeGroupInviteLink', { chatId: groupId });
            return response;
        }
        case 'joinGroupViaLink': {
            const inviteLink = this.getNodeParameter('inviteLink', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/joinGroupViaLink', { link: inviteLink });
            return response;
        }
        case 'approveGroupJoinRequest': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const participantNumber = this.getNodeParameter('participantNumber', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/approveGroupJoinRequest', {
                groupChatId: groupId,
                contactId: participantNumber,
            });
            return response;
        }
        case 'rejectGroupJoinRequest': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const participantNumber = this.getNodeParameter('participantNumber', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/rejectGroupJoinRequest', {
                groupChatId: groupId,
                contactId: participantNumber,
            });
            return response;
        }
        case 'setGroupToAdminsOnly': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const adminsOnly = this.getNodeParameter('adminsOnly', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/setGroupToAdminsOnly', {
                groupId,
                onlyAdmins: adminsOnly,
            });
            return response;
        }
        case 'setGroupEditToAdminsOnly': {
            const groupId = this.getNodeParameter('groupId', itemIndex);
            const adminsOnly = this.getNodeParameter('adminsOnly', itemIndex);
            const response = await ApiRequest_1.openwaApiRequest.call(this, 'POST', '/setGroupEditToAdminsOnly', {
                groupId,
                onlyAdmins: adminsOnly,
            });
            return response;
        }
        default:
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unknown operation: ${operation}`);
    }
}
//# sourceMappingURL=Group.js.map