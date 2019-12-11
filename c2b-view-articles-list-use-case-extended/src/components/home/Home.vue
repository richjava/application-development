<template>
  <div>
    <h1>Articles</h1>
    <!-- Use case c2b - extended: News source dropdown -->
    <div class="jumbotron">
      <h4>Select News Source</h4>
      <select v-on:change="sourceChanged">
        <option value="">Please select news source...</option>
        <option v-for="source in sources" v-bind:key="source.id" v-bind:value="source.id">{{ source.name }}</option>
      </select>
    </div>
    <ul>
      <!-- Use case c2a: Iterate over (loop through) and display articles -->
      <li class="media" v-for="article in articles" v-bind:key="article.id">
        <div class="media-left">
          <a v-bind:href="article.url" target="_blank">
            <img class="media-object" v-bind:src="article.urlToImage" v-bind:alt="article.title" />
          </a>
        </div>
        <div class="media-body">
          <h4 class="media-heading">
            <a v-bind:href="article.url" target="_blank">{{ article.title }}</a>
          </h4>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: function() {
    return {
      // Use case c2b - extended: "sources" data variable
      sources: [],
      articles: []
    };
  },
  methods: {
    // Use case c2b: Handle the changing of source and use the source value to get articles.
    sourceChanged: function(evt) {
      this.getArticles(evt.target.value);
    },
    // Use case c2: Get the articles from the external API.
    getArticles: function(source) {
      if (source) {
        this.$http
          .get(
            `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${
              process.env.VUE_APP_API_KEY
            }`
          )
          .then(function(data) {
            // Use case c2a: Set the "articles" data variable to what was retrieved from the external API.
            this.articles = data.body.articles;
          });
      }
    }
  },
  created: function() {
    //Use case c2b - extended: Get news sources on creation of this component.
    this.$http
      .get(
        `https://newsapi.org/v2/sources?apiKey=${process.env.VUE_APP_API_KEY}`
      )
      .then(function(data) {
        // Use case c2b: Set the "sources" data variable to what was retrieved from the external API.
        this.sources = data.body.sources;
      });
  }
};
</script>

<style scoped></style>
