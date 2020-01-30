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