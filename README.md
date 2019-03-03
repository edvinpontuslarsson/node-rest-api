# Examination 2 - web API

* [Report](#report)
* [Instructions](#instructions)

## Report

What could I have done better?

Lots of similar functionality repeatedly, maybe could have reduced code by reusing general functions more

Follow a more standard HATEOAS pattern

Why not xml? JSON is easier to work with. Very common. 

### 1. Explain and defend your implementation of HATEOAS in your solution.

As an example, here is the JSON response object of the index url:

```json
{
    "info": "Welcome to the MessageBoard API!",
    "links": [
        {
            "rel": "list-messages",
            "href": "localhost:3000/list-messages",
            "actions": [
                {
                    "method": "GET"
                }
            ]
        },
        {
            "rel": "sign-up",
            "href": "localhost:3000/sign-up",
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
            "href": "localhost:3000/sign_in",
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
            "href": "localhost:3000/create-message",
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
            "href": "localhost:3000/register-webhook",
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
            "href": "localhost:3000/list-webhooks",
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

pros - quite simple, might be easier to do correctly since it's well integrated into express

cons - performance suffers

### 4. Explain how your web hook works.
### 5. Since this is your first own web API there are probably things you would solve in an other way looking back at this assignment. 

## Instructions

git push heroku master

newman run postman-tests.json
