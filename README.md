# Application Development
An introduction to full stack development using Vue.JS, Node.JS, Express, MongoDB, and Mongoose.

## How to use
The directories in this project are each projects that follow a step by step guide to application devlopment. Open up each one and read its README.md file to find out more. You can use your text editor's search tool to find out the relevant parts of a project by search the project's code:
c1 - c6 Client-side projects
s1 -s5 Server-side projects

## Client-side development (c1 - c6)

### Use cases
#### 1. View About page (c1)
In order for the user to be able to navigate our website, and in this case view the About page, we need to implement routing. In Vue, this is accomplished by using an external plugin - ```vue-router```.

#### 2a. View articles list (c2a)
We are going to get our articles from an external API [newsapi.org](https://newsapi.org/). In order to do so we need a Javascript library or Vue plugin that can help us to make and handle HTTP requests. We'll use the Vue plugin ```vue-resource``` for this.

#### 2b. View articles list -extended (c2b)
A closer look at [newsapi.org](https://newsapi.org/) indicates that we can add more functionality to improve the user experience. The API also exposes a list of news sources. Let's add a new feature that will allow the user to filter the list of articles by new source.

#### 2c. View articles list - refactored (c2c)
The way we wrote the code to implement our new feature could be improved. It might be that we want to re-use the list in other areas of our application, but to do so would mean we'd have repeated code.

Let's create a Vue component out of our list, and we'll do the same with the news source form. The two components need to communicate with each other, so we'll use [component props](https://vuejs.org/v2/guide/components-props.html) and [custom events](https://vuejs.org/v2/guide/components-custom-events.html) for that.

#### 3. View article details (c3)
A common pattern for applications to follow is the "master-detail" pattern. This is when you have a collection of items (like articles) and you can select one item to get further details. It would be great to build this feature into our application, but we've discovered a limitation of the [newsapi.org](https://newsapi.org/) API. They only expose the URL for a detail page, not the full article data itself. Luckily, we have built a custom API on [Glitch](https://glitch.com/) that will allow us to do this, so let's switch to using that API instead.

The article base URL is ```https://api-entity-relationships.glitch.me``` and the endpoints are:

- Get all articles: ```GET /api/articles```
- Get an article by ID: ```GET /api/articles/:articleId```

No authentication is necessary to access this API (so you won't need an API key).

#### 4. Add article

#### 5. Update article

#### 6. Delete article

## Server-side development (s1 -s5)

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
#### 1. Routes (s1)
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

We are going to create another entity: Users. In doing so, we need to think about the relationship between users and articles. Mush the same as our example with posts and comments, we can represent users and articles with a one-to-many relationship, i.e. one user can have many articles.

After completing code necessary to create this relationship, import the ```s5-entity-relationships.postman_collection.json``` file into Postman and test out your new API. 