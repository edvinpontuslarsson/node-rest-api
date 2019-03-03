git push heroku master

What could have done better?

Lots of similar functionality repeatedly, maybe could have reduced code by reusing general functions more

Why not xml? JSON is easier to work with. Very common. 

Idea: A CRUD message board in API form. Web hook when new message is posted. 

add user
sign in
add message
edit message
delete message
delete user

* message_number
* user
* title
* message

After post, response with message id.

Restricted?

// perhaps:
* topic
* parent_id // response to, null if none, see reddit examples
