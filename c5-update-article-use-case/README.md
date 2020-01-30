# Application Development
An introduction to full stack development using Vue.JS, Node.JS, Express, MongoDB, and Mongoose.

## Client-side development
### Installation

1. Open the terminal up on this directory and run:
````
npm install
````
2. Add a file to the root of this directory called ```.env``` and add the following:
````
VUE_APP_API_URL=http://example-api4.glitch.me/api/
````
3. Run:
````
npm run serve
````

### Use cases
#### 1. View About page (c1)
In order for the user to be able to navigate our website, and in this case view the About page, we need to implement routing. In Vue, this is accomplished by using an external plugin - ```vue-router```.

#### 2a. View articles list (c2a)
We are going to get our articles from an external API [newsapi.org](https://newsapi.org/). In order to do so we need a Javascript library or Vue plugin that can help us to make and handle HTTP requests. We'll use the Vue plugin ```vue-resource``` for this.

#### 2b. View articles list - extended (c2b)
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

#### 4. Add article (c4)
Now we're using a custom API, we can really ramp up the features. Let's add full CRUD functionality (create, read, update, delete). Starting with "Create", we'll allow the user to add an article. 

We should think of what properties an article might have. These will correspond to our front-end app's form fields, and will also match the entity/model we create later in our server-side app. So, an article has:

- title
- description
- body
- a time it was created
- a time it was updated

We'll just handle the title and body on the frontend.

#### 5. Update article (c5)
In order to implement this use case, we can reuse the ```ArticleEditor``` component and just fill it with values from our database. The difference between this and the ```Add article``` use case is that we need to retrieve an Article by it's ID and make it available to the ```ArticleEditor```.