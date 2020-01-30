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

#### 2. Set up database (s2)
For convenience, we're going to use a cloud-based database provider, MongoDB Atlas, for our database. You could choose to install MongoDB onto your own machine, but this is not covered here.

##### Environment variables
In this directory create an ```.env``` file, add your Atlas (or other) connection URL:

````
MONGODB_URI=<YOUR_CONNECTION_URL>
````
##### MongoDB Atlas setup
1. Sign up at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster (you can just keep the defaults and continue without upgrading)
3. Create a database user
- Go to Security > Database Access, then "Add New User". 
- Enter a Username and password (that you don't use for anything else - you could just autogenerate it) and make a note of these so you don't forget them. 
IMPORTANT: *DON'T* put the password directly into your code. Use a .env file and make sure you have a [.gitignore](https://help.github.com/en/github/using-git/ignoring-files) file in the root of your project that contains a line ```.env```
- Choose "Read and write to any database", then click "Add User".
4. Whitelist your IP address
- In the main menu, go to "Network Access". Choose "Allow access from anywhere" and click "Confirm".
5. Load sample data
- Skip this step.
6. Connect to your cluster
- Go to Atlas > Clusters and click "Connect". Choose "Connect your application" and copy the connection string. 
- Paste it into your .env file as the value for ```MONGODB_URI``` (remember to make sure you've got ```.env``` listed in your ```.gitignore``` file!).
- Change the ```<password>``` in the connection string to the password that you specified when creating the database user.
7. Now run ```npm run dev``` on the directory and you should see ```✔ MongoDB connected```. Your application now has a database!

#### 3. Set up models (s3)
For a start, we're going to just have one database model - "Article". The [Mongoose schema](https://mongoosejs.com/docs/guide.html) for this model will look like this:

|    Property    |   Type   |
|       ---      |    ---   |
|  title         |  String  |
|  description   |  String  |
|  body          |  String  |

### 4. CRUD functionality (s4)
"CRUD" stands for Create, Read, Update, and Delete, and these are the operations that we'll need to implement in order to implement our use cases below. We can achieve this by going back to our ```routes/v1/articles.js``` file and refactoring it to use the database and Mongoose model that we've set up.

#### Use cases
These are the use cases that we can implement on the server-side in ```routes/v1/articles.js```.
1. View all articles
2. View a single article
3. Add an article
4. Update an article
5. Delete an article

Once you have implemented each of the use cases, test the API in the collection that you had previously set up in Postman and watch the data change in MongoDB Atlas (go to Clusters > Collections). Magic!

### 5. Relationships between entities (s5)
Right now our application has one entity (represented by our database model): Articles. Most applications have more than one entity, and the entities in an application often have relationships with each other. For example, a "Comment" entity might belong to a "Post" entity. This would be a "one-to-many" relationship, where one post can have many comments (and a comment can only belong to one particular post). 

We are going to create another entity: Users. In doing so, we need to think about the relationship between users and articles. Much the same as our example with posts and comments, we can represent users and articles with a one-to-many relationship, i.e. one user can have many articles.

The schema of the User entity will look like this:

|    Property    |       Type       |
|       ---      |        ---       |
|  firstName     |  String          |
|  lastName      |  String          |
|  displayName   |  String          |
|  email         |  String          |
|  articles      |  Array<Article>  |

And the new schema for our Article entity will look like this:

|    Property    |   Type   |
|       ---      |    ---   |
|  title         |  String  |
|  description   |  String  |
|  body          |  String  |
|  author        |  User    |

After completing code necessary to create this relationship, import the ```s5-entity-relationships.postman_collection.json``` file into Postman and test out your new API. 

We now have two projects that comprise a feature-packed full-stack application!

## Next steps
- This application fits a model where a user can see all articles once logged in. Change the application so that it fits a model where users only have access to their own posts.
- Improve the application so that it uses a more robust industry standard auth system. One popular set of Express middleware for this is [passport.js](http://www.passportjs.org/) and you can see it in use in [node-express-realworld-example-app](https://github.com/gothinkster/node-express-realworld-example-app).