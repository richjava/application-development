<template>
  <div class="container">
    <ul>
      <!-- Iterate over (loop through) and display articles -->
      <li class="media" v-for="article in articles" v-bind:key="article.id">
        <div class="media-left">
          <a v-bind:href="article.url" target="_blank">
            <img
              class="media-object"
              v-bind:src="article.urlToImage"
              v-bind:alt="article.title"
            />
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
  name: "NewsList",
  // Use case c2c - refactored: List the props that are passed in - https://vuejs.org/v2/guide/components-props.html
  props: ["source"],
  // Use case c2: Set the "articles" data variable initial value to an empty array
  data: function() {
    return {
      articles: []
    };
  },
  methods: {
    // Use case c2: Get the articles from the external API. Add the API key/value pair to a .env file in the root of the project.
    getArticles: function(source) {
      if (source) {
        this.$http
          .get(
            "https://newsapi.org/v2/top-headlines?sources=" +
              source +
              "&apiKey=" + process.env.VUE_APP_API_KEY
          )
          .then(function(data) {
            // Use case c2: Set the "articles" data variable to what was retrieved from the external API.
            this.articles = data.body.articles;
          });
      }
    }
  },
  // Use case c2c - refactored: Watch the "source" prop that is passed in - https://vuejs.org/v2/guide/computed.html#Watchers
  watch: {
    source: function(val) {
      this.getArticles(val);
    }
  }
};
</script>

<style scoped>
.media-object {
  width: 120px;
}
</style>
