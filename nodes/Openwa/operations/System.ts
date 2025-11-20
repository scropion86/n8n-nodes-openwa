import type { INodeProperties, IExecuteFunctions } from 'n8n-workflow';
import { NodeOperationError } from 'n8n-workflow';

export const systemFields: INodeProperties[] = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: {
                resource: ['system'],
            },
        },
        options: [
            {
                name: 'Get Battery Level',
                value: 'getBatteryLevel',
                description: 'Get the device battery level',
                action: 'Get battery level',
            },
            {
                name: 'Get Connection State',
                value: 'getConnectionState',
                description: 'Get the connection state',
                action: 'Get connection state',
            },
            {
                name: 'Get Host Number',
                value: 'getHostNumber',
                description: 'Get the host phone number',
                action: 'Get host number',
            },
            {
                name: 'Get WA Version',
                value: 'getWAVersion',
                description: 'Get the WhatsApp version',
                action: 'Get wa version',
            },
            {
                name: 'Is Connected',
                value: 'isConnected',
                description: 'Check if the client is connected',
                action: 'Is connected',
            },
            {
                name: 'Kill Client',
                value: 'kill',
                description: 'Kill the client session',
                action: 'Kill client',
            },
        ],
        default: 'getBatteryLevel',
    },
];

import { openwaApiRequest } from '../transport/ApiRequest';

export async function systemOperations(
    this: IExecuteFunctions,
    operation: string,
    _itemIndex: number,
): Promise<unknown> {
    void _itemIndex;

    switch (operation) {
        case 'getBatteryLevel': {
            const response = await openwaApiRequest.call(this, 'POST', '/getBatteryLevel');
            return response;
        }

        case 'getConnectionState': {
            const response = await openwaApiRequest.call(this, 'POST', '/getConnectionState');
            return response;
        }

        case 'getHostNumber': {
            const response = await openwaApiRequest.call(this, 'POST', '/getHostNumber');
            return response;
        }

        case 'getWAVersion': {
            const response = await openwaApiRequest.call(this, 'POST', '/getWAVersion');
            return response;
        }

        case 'isConnected': {
            const response = await openwaApiRequest.call(this, 'POST', '/isConnected');
            return response;
        }

        case 'kill': {
            const response = await openwaApiRequest.call(this, 'POST', '/kill');
            return response;
        }

        default:
            throw new NodeOperationError(
                this.getNode(),
                `Unknown operation: ${operation}`,
            );
    }
}
