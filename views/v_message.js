'use strict'

const getMessageView = (hostname, messageID) =>
    JSON.stringify(
        {
            rel: `${message}/${messageID}`,
            href: `${hostname}/${message}/${messageID}`,
            actions: [
                { method: get },
                {
                    method: put,
                    headers: [
                        {
                          name: 'Authorization',
                          type: string,
                          format: 'Bearer <access_token>'
                        }
                    ],
                    fields: [
                        {
                            name: 'title',
                            type: string,
                            required: false,
                            info: 'Remains unedited if field is omitted'
                        },
                        {
                            name: 'message',
                            type: string,
                            required: false,
                            info: 'Remains unedited if field is omitted'
                        }
                    ]
                },
                {
                    method: httpDelete,
                    headers: [
                        {
                          name: 'Authorization',
                          type: string,
                          format: 'Bearer <access_token>'
                        }
                    ]
                }
            ]
        }
    )

const get = 'GET'
const put = 'PUT'
const httpDelete = 'DELETE'
const string = 'string'

const message = 'message'

module.exports = {
    getMessageView
}
