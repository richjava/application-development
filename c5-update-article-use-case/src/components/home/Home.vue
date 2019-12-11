<template>
  <div>
    <h1>Articles</h1>
    <router-link :to="{ name: 'article-editor'}">New article</router-link>
    <ul>
      <!-- Use case c2a: Iterate over (loop through) and display articles -->
      <li class="media" v-for="article in articles" v-bind:key="article.id">
        <div class="media-left">
          <!-- Use case c3: Link to details route, passing through the article ID as a param -->
          <router-link :to="{ name: 'details', params: { articleId: article.id }}">{{article.title}}</router-link>
        </div>
        <div class="action-links">
          <!-- Use case c5: Add Edit link -->
          <router-link :to="{ name: 'article-editor', params: { articleId: article.id }}">Edit</router-link>
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
    getArticles: function() {
      this.$http
        .get(`${process.env.VUE_APP_API_URL}articles`)
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

<style scoped>
.media {
  display: flex;
}
.media-left {
  width: 80%;
}
</style>
