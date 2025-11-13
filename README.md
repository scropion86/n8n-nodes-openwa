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

Contributing

*   Contributions and improvements welcome — open PRs to this repository.

License

*   See `package.json` for license information.

If you want, I can also add a short smoke-test script or usage examples for the most common operations.