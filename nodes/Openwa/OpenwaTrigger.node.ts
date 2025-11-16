import type { IDataObject, INodeType, INodeTypeDescription, IWebhookFunctions, IWebhookResponseData } from 'n8n-workflow';

export class OpenwaTrigger implements INodeType {
	usableAsTool = true;

	description: INodeTypeDescription = {
		displayName: 'Openwa Trigger',
		name: 'openwaTrigger',
		icon: 'file:openwa.svg',
		group: ['trigger'],
		version: 1,
		description: 'Listen to Openwa webhook events in real-time',
		defaults: {
			name: 'Openwa Trigger',
		},
		credentials: [
			{
				name: 'openwaApi',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
		inputs: [],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
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
				displayName: 'Session ID Filter',
				name: 'sessionIdFilter',
				type: 'string',
				default: '',
				description:
					'Optional: Only trigger on events from this specific session. Leave empty to accept all sessions.',
			},
		],
		usableAsTool: true,
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const bodyData = this.getBodyData() as IDataObject;

		const events = (this.getNodeParameter('events') as string[]) || [];
		const sessionIdFilter = (this.getNodeParameter('sessionIdFilter') as string) || '';

		const eventType = bodyData.event as string | undefined;
		const sessionId = bodyData.sessionId as string | undefined;

		// Validate event type is in the list of selected events
		if (!eventType || !events.includes(eventType)) {
			return {};
		}

		// Validate session ID if filter is set
		if (sessionIdFilter && sessionId !== sessionIdFilter) {
			return {};
		}

		// Return workflow data to trigger the workflow
		return {
			workflowData: [this.helpers.returnJsonArray([bodyData])],
		};
	}
}
