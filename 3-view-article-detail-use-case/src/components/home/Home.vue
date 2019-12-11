<template>
  <div>
    <h1>Articles</h1>
    <ul>
      <!-- Use case c2a: Iterate over (loop through) and display articles -->
      <li class="media" v-for="article in articles" v-bind:key="article.id">
        <!-- Use case c3: Link to details route, passing through the article ID as a param -->
        <router-link :to="{ name: 'details', params: { articleId: article.id }}">{{article.title}}</router-link>
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
    getArticles: function() {
      this.$http
        .get(`https://api-entity-relationships.glitch.me/api/articles`)
        .then(function(data) {
          // Use case c2a: Set the "articles" data variable to what was retrieved from the external API.
          this.articles = data.body.articles;
        });
    }
  },
  created: function() {
    // Use case c3: Get the articles on creation of this component.
    this.getArticles();
  }
};
</script>

<style scoped></style>
