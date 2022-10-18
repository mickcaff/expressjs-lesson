const { request, response } = require("express");
const express = require("express");

// Create a bundle of routes. We'll export this out and then import it into src/index.js.
const routes = express.Router();

 const {
  getAllPosts, getSpecificPost, createSpecificPost, updateSpecificPost, deleteSpecificPost
} = require('./BlogsFunctions')

// This is the "root" route for the Router instance.
// Its actual name in the URL will depend on how it's configured in src/index.js
routes.get("/", async (request, response) => {

  let postsResult = await getAllPosts()
  response.json(postsResult)
  // response.json({"message": `Received a request on ${request.originalUrl}`});
});

// Set up route params with the colon before the name.
routes.get("/:blogID", async (request, response) => {

  let singleBlogPost = await getSpecificPost(request.params.blogID)
  response.json(singleBlogPost)

  // response.json(
  //   `Received a GET request for a blog post with ID of ${request.params.blogID}`
  // );
});

// Use Postman or another HTTP tool to visit a POST route.
routes.post("/", async (request, response) => {

  let creationResult = await createSpecificPost({
    postTitle: request.body.postTitle,
    postContent: request.body.postContent,
    postAuthorID: request.body.postAuthorID
  })

  response.json(creationResult)

    // console.log(`Content author was ${request.body.postAuthorId}`);

  // response.json({
  //   message: `Received a POST request for a blog post with ID of ${request.params.blogID}`
  // });
});

routes.delete("/:postID", async (request, response) => {
  let deleteResult = await deleteSpecificPost(request.params.postID)
})

routes.put('/:postID', async (request, response) => {
  let updateResult = await updateSpecificPost({
    postID: request.params.postID,
    postTitle: request.body.postTitle,
    postContent: request.body.postContent,
    postAuthorID: request.body.postAuthorID
  })
  response.json(updateResult)
})

module.exports = routes;
