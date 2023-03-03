# Post-App

## Phase I

### Models
- Post Model
```
{ Name: {mandatory}, Post: {mandatory},  isDeleted: {boolean, default: false}}
```
- Comment Model
```
{  PostId:{mandatory},Name:{mandatory},Comment:{mandatory},Reply:array of objects - {Name:String,reply:String,status:{Boolean,default:false}},
    isDeleted:{Boolean,default:false} }
```

### Post APIs 

### POST /createpost
- Create an post
- Create a post document from request body.
  `Endpoint: BASE_URL/createpost`

### GET /getpost
-  Returns all posts in the collection that aren't deleted
-  Return the HTTP status 200 if any documents are found. The response structure should be like [this](#successful-response-structure) 
-  If no documents are found then return an HTTP status 404 with a response like [this](#error-response-structure)

### PUT /updatepost
-  Updates a post by changing the its post content.
-  Return an HTTP status 200 if updated successfully with a body like
-  Also make sure in the response you return the updated blog document.

### PUT /deletepost
-  Check if the postId exists( and is not deleted). If it does, mark it deleted and return an HTTP status 200 without any response body.
-  If the post document doesn't exist then return an HTTP status of 404 with a body.