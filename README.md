# n8n Community Node — Openwa (WhatsApp API)

This repository provides an n8n community node that integrates with the Openwa (wa-automate) WhatsApp API.

Small overview

*   Purpose: let n8n users send messages and manage chats, groups, contacts, statuses and webhooks via an Openwa instance.
*   Credentials: the node uses a simple base URL + API key header authentication (the credential expects a Base URL and an `apiKey` which is sent as the `api_key` header).
*   Request envelope: the Openwa API endpoints used by this node expect POST bodies wrapped in an `args` envelope (for example: `{ "args": { ... } }`).

Included resources and operations

*   Message: send text, media, reply, edit, react, get info, delete
*   Chat: list chats, get chat info, archive/unarchive, mute/unmute, pin/unpin, clear, delete, mark all read
*   Group: create group, add/remove/promote/demote participants, set title/description, leave group
*   Contact: list contacts, get contact, block/unblock, check number status, business profile
*   Status: post text/image/video statuses, list my statuses, delete status
*   Webhook: register, list, update, remove webhooks

Quick links

*   Openwa ([official documentation](https://docs.openwa.dev/)):
*   Open-wa GitHub ([wa-automate-nodejs](https://github.com/open-wa/wa-automate-nodejs))

How to use

1.  Install the node package into your n8n instance (or run n8n with this package linked during development).
2.  Create new credentials of type "Openwa API" and set:
    *   API Base URL — the base URL of your Openwa server (for example `http://domain.com:8080`).
    *   API Key — the API key set on your Openwa server.
3.  Add the node to your workflow and choose a Resource + Operation.
4.  For POST operations, provide the operation fields — the node will wrap payloads into the required `{ args: { ... } }` envelope automatically.

Notes and troubleshooting

*   If an endpoint fails, enable verbose logging on your Openwa server and compare the request payload. The node maps common field names to the API's required keys (e.g. `chatId` -> `to`, message `content` field used as required by the API).
*   Verify the `api_key` header name matches your server's configuration.

## How to Add a New API in the Future

Here's a step-by-step guide to add a new endpoint. We'll use `sendLocation` as an example:

### Step 1: Add the operation to the options list

In `nodes/Openwa/operations/Message.ts` (or the relevant resource file), find the `options` array and add your operation **in alphabetical order**:

```typescript
{
  name: 'Send Location',
  value: 'sendLocation',
  description: 'Send a location message',
  action: 'Send location',
},
```

### Step 2: Add input fields

Add field definitions right below the operation options:

```typescript
{
  displayName: 'Chat ID',
  name: 'chatId',
  type: 'string',
  default: '',
  displayOptions: {
    show: {
      resource: ['message'],
      operation: ['sendLocation'],
    },
  },
  description: 'The chat to send the location to',
  placeholder: 'chat_id@c.us',
},
{
  displayName: 'Latitude',
  name: 'latitude',
  type: 'number',
  default: 0,
  displayOptions: {
    show: {
      resource: ['message'],
      operation: ['sendLocation'],
    },
  },
  description: 'Latitude coordinate',
},
{
  displayName: 'Longitude',
  name: 'longitude',
  type: 'number',
  default: 0,
  displayOptions: {
    show: {
      resource: ['message'],
      operation: ['sendLocation'],
    },
  },
  description: 'Longitude coordinate',
},
```

**Key points:**
- `displayOptions.show.operation: ['sendLocation']` = field only appears when user selects that operation
- `type` options: `'string'`, `'number'`, `'boolean'`, `'options'` (dropdown), `'json'`, etc.
- Set `default` to a sensible empty value
- Add `placeholder` to guide users

### Step 3: Add the switch case in the handler function

In the operation handler (e.g., `messageOperations`), add a new case:

```typescript
case 'sendLocation': {
  const chatId = this.getNodeParameter('chatId', itemIndex) as string;
  const latitude = this.getNodeParameter('latitude', itemIndex) as number;
  const longitude = this.getNodeParameter('longitude', itemIndex) as number;

  const response = await this.helpers.httpRequest({
    method: 'POST',
    url: `${baseUrl}/sendLocation`,
    headers,
    json: true,
    body: { args: { 
      to: chatId,  // Map 'chatId' to 'to' (as required by API)
      latitude,
      longitude,
    } },
  });

  return response;
}
```

**Important:**
- Always wrap POST body as `{ args: { ... } }` (Openwa API contract)
- Use `this.getNodeParameter('<fieldName>', itemIndex)` to get user input
- Map internal field names to API keys if different (e.g., `chatId` → `to`, `messageText` → `content`)

### Step 4: Test locally

```powershell
npm run build
npm run lint
```

---

## Field Types Reference

| Type | Usage | Example |
|------|-------|---------|
| `'string'` | Text input | Chat ID, message text, URLs |
| `'number'` | Numeric input | Latitude, longitude, timeout |
| `'boolean'` | Toggle on/off | Mute, archive flags |
| `'options'` | Dropdown menu | Choose from preset values |
| `'json'` | Raw JSON editor | Complex data structures |
| `'dateTime'` | Date/time picker | Timestamps |

For dropdown fields with preset values, use `'options'` type with an `options` array:

```typescript
{
  displayName: 'Status Type',
  name: 'statusType',
  type: 'options',
  options: [
    { name: 'Text', value: 'text' },
    { name: 'Image', value: 'image' },
    { name: 'Video', value: 'video' },
  ],
  default: 'text',
}
```

---

## File Structure

```
nodes/Openwa/operations/
├── Message.ts      ← send/manage messages
├── Chat.ts         ← chat operations
├── Group.ts        ← group operations
├── Contact.ts      ← contact operations
├── Status.ts       ← status and snapshot operations
└── Webhook.ts      ← webhook operations
```

Each file exports:
- `export const <resource>Fields: INodeProperties[]` — all input fields
- `export async function <resource>Operations(...)` — handler with switch cases

---

Contributing

*   Contributions and improvements welcome — open PRs to this repository.

License

*   See `package.json` for license information.