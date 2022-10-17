const express = require("express");

// Create a bundle of routes. We'll export this out and then import it into src/index.js.
const routes = express.Router();

// This is the "root" route for the Router instance.
// Its actual name in the URL will depend on how it's configured in src/index.js
routes.get("/", (request, response) => {
  response.json({"message": `Received a request on ${request.originalUrl}`});
});

// Set up route params with the colon before the name.
routes.get("/:blogID", (request, response) => {
  response.json(
    `Received a GET request for a blog post with ID of ${request.params.blogID}`
  );
});

// Use Postman or another HTTP tool to visit a POST route.
routes.post("/:blogID", (request, response) => {

    console.log(`Content author was ${request.body.postAuthorId}`);

  response.json({
    message: `Received a POST request for a blog post with ID of ${request.params.blogID}`
  });
});

module.exports = routes;
