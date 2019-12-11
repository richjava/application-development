<template>
  <div>
    <h1>Articles</h1>
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
      articles: []
    };
  },
  methods: {
    // Use case c2a: Get the articles from the external API. Add the API key/value pair to a .env file in the root of the project.
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
    // Use case c2a: Specify the news source and get the articles on creation of this component.
    const source = 'abc-news';
    this.getArticles(source);
  }
};
</script>

<style scoped></style>
