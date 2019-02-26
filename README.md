git push heroku master

Why not xml? JSON is easier to work with. Very common. 

Idea: A CRUD message board in API form. Web hook when new message is posted. 

* message_number
* user
* title
* message

After post, response with message id.

Restricted?

// perhaps:
* topic
* parent_id // response to, null if none, see reddit examples

HATEOS: https://www.youtube.com/watch?v=oTJnx_xjpb0

GET '/' // all messages

See the stories here: https://www.infoq.com/articles/webber-rest-workflow
