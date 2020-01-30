# Application Development
An introduction to full stack development using Vue.JS, Node.JS, Express, MongoDB, and Mongoose.

## Server-side development (s1 -s5)
The server-side application needs to be able to handle:
- routes
- Object Relational Mapping (ORM) - which means taking an entity object, like ```Article``` and storing it in the database, and vice-versa
- CRUD (Create, Read, Update, Delete) operations for our ```Article``` and ```User``` entities

As our application is going to have multiple entities, we also need to think about their relationships and how they're going to work with each other.

### Installation of server side projects

1. Open the terminal up on this directory and run:
````
npm install
````
2. Run the development server:
````
npm run dev
````

### Using the API
#### Simple first test
After running the server, for a quick test in the browser you can go to the following endpoints:

#### Get an article
[GET /v1/articles](http://localhost:3000/v1/articles)

#### Get an article by ID
[GET /v1/articles/:articleId](http://localhost:3000/v1/articles/abc123)

#### Testing the API using a collaorative platform
To test POST, PUT and DELETE requests, we're going to use [Postman](https://www.getpostman.com/).

In Postman, import the ```s1-create-routes-setup.postman_collection.json``` file from this directory which will create a new collection for you to test out all of the API endpoints.

### Project functionality
#### 1. Set up routes (s1)
To create our API, we need to set up routes that can handle incoming requests. If we want an API that can help us implement CRUD functionality for our application, we'll need to set up
routes to handle GET, POST, PUT, and DELETE HTTP request methods.