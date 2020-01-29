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

#### 2b. View articles list -extended (c2b)
A closer look at [newsapi.org](https://newsapi.org/) indicates that we can add more functionality to improve the user experience. The API also exposes a list of news sources. Let's add a new feature that will allow the user to filter the list of articles by new source.

#### 2c. View articles list - refactored (c2c)
The way we wrote the code to implement our new feature could be improved. It might be that we want to re-use the list in other areas of our application, but to do so would mean we'd have repeated code.

Let's create a Vue component out of our list, and we'll do the same with the news source form. The two components need to communicate with each other, so we'll use [component props](https://vuejs.org/v2/guide/components-props.html) and [custom events](https://vuejs.org/v2/guide/components-custom-events.html) for that.