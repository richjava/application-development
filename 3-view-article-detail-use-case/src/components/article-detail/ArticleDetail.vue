<template>
  <div>
      <h1>{{article.title}}</h1>
  </div>
</template>

<script>
export default {
  name: "ArticleDetail",
  data: function() {
    return {
      article: {}
    };
  },
  methods: {
    // Use case c3: Get the article from the external API by ID.
    getArticle: function(articleId) {
      this.$http
        .get(`https://api-entity-relationships.glitch.me/api/articles/${articleId}`)
        .then(function(data) {
          // Use case c2a: Set the "articles" data variable to what was retrieved from the external API.
          this.article = data.body.article;
        });
    }
  },
  created: function() {
    // Use case c3: Get the article ID from the route params and pass it to getArticle method on creation of this component.
    const articleId = this.$route.params.articleId;
    this.getArticle(articleId);
  }
};
</script>

<style scoped></style>
