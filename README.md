# Examination 2 - web API

* [Report](#report)

## Report

### 1. Explain and defend your implementation of HATEOAS in your solution.

As an example, here is the JSON response object of the index url:

```json
{
    "info": "Welcome to the MessageBoard API!",
    "links": [
        {
            "rel": "list-messages",
            "href": "el223na.herokuapp.com/list-messages",
            "actions": [
                {
                    "method": "GET"
                }
            ]
        },
        {
            "rel": "sign-up",
            "href": "el223na.herokuapp.com/sign-up",
            "actions": [
                {
                    "method": "GET"
                },
                {
                    "method": "POST",
                    "fields": [
                        {
                            "name": "username",
                            "type": "string",
                            "format": "3-30 characters long"
                        },
                        {
                            "name": "password",
                            "type": "string",
                            "format": "at least 5 characters long"
                        },
                        {
                            "name": "repeat_password",
                            "type": "string",
                            "format": "Identical to password"
                        }
                    ]
                }
            ]
        },
        {
            "rel": "sign_in",
            "href": "el223na.herokuapp.com/sign_in",
            "actions": [
                {
                    "method": "GET"
                },
                {
                    "method": "POST",
                    "fields": [
                        {
                            "name": "username",
                            "type": "string"
                        },
                        {
                            "name": "password",
                            "type": "string"
                        }
                    ]
                }
            ]
        },
        {
            "rel": "create-message",
            "href": "el223na.herokuapp.com/create-message",
            "actions": [
                {
                    "method": "GET"
                },
                {
                    "method": "POST",
                    "headers": [
                        {
                            "name": "Authorization",
                            "type": "string",
                            "format": "Bearer <access_token>"
                        }
                    ],
                    "fields": [
                        {
                            "name": "title",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "message",
                            "type": "string",
                            "required": true
                        }
                    ]
                }
            ]
        },
        {
            "rel": "register-webhook",
            "href": "el223na.herokuapp.com/register-webhook",
            "actions": [
                {
                    "method": "GET"
                },
                {
                    "method": "POST",
                    "headers": [
                        {
                            "name": "Authorization",
                            "type": "string",
                            "format": "Bearer <access_token>"
                        }
                    ],
                    "fields": [
                        {
                            "name": "webhook_url",
                            "type": "string",
                            "required": true
                        }
                    ]
                }
            ]
        },
        {
            "rel": "list-webhooks",
            "href": "el223na.herokuapp.com/list-webhooks",
            "actions": [
                {
                    "method": "GET",
                    "headers": [
                        {
                            "name": "Authorization",
                            "type": "string",
                            "format": "Bearer <access_token>"
                        }
                    ]
                }
            ]
        }
    ]
}
```

The "links" arrays contain objects with info relevant for taking the next steps. As an example, after registering, info about authenticating is sent. 

"rel" is the relative url and "href" is the absolute url.

The "actions" arrays contain information about what methods can be used for that specific url, if there are required fields/headers as well as information about how those should be formatted. 

### 2. If your solution should implement multiple representations of the resources. How would you do it?

Checking for accept headers in the request and then, if possible, responding with the requested content-type, e.g. JSON or xml.

### 3. Motivate and defend your authentication solution.

#### What other authentication solutions could you implement?

I could have used express-sessions

#### What pros/cons do this solution have?

Pros: it would be quite simple and might be easier to do correctly since that is well integrated with the express framework.

Cons: using server-side sessions is a worse option for good performance and also less convenient for API users.

### 4. Explain how your web hook works.

When a new message is created, the function "notifyNewMessage" in notifications/notification.js is called with the message data object. 

That function loops through the stored webhook urls and makes post requests to the valid urls with the new message data as JSON.

### 5. Since this is your first own web API there are probably things you would solve in an other way looking back at this assignment. 

I would have tried to follow a more standardized pattern with the API responses. Such as Collection+JSON - Hypermedia Type. 
