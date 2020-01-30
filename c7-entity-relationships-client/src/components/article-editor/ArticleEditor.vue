<template>
  <div>
    <h1>New article</h1>
    <!-- Use case c4: Article form -->
    <form @submit="checkForm">

      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>

      <div>
        <label for="name">Title</label>
        <!-- v-model is used for two-way binding (useful for the next use case) -->
        <input v-model="article.title" type="text" name="name" placeholder="Enter the title">
      </div>

      <div>
        <label for="name">Description</label>
        <input v-model="article.description" type="text" name="description" placeholder="Enter a description">
      </div>

      <div>
        <label for="name">Body</label>
        <textarea v-model="article.body" type="text" name="body" placeholder="Enter the article body"></textarea>
      </div>

      <div>
        <input type="submit" value="Submit">
      </div>

    </form>
  </div>
</template>

<script>
export default {
  name: "ArticleEditor",
  data: function() {
    return {
      isEdit: false,
      errors: [],
      article: {
        title: null,
        description: null,
        body: null
      }
    };
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();
      if (this.article.title && this.article.description && this.article.body) {
        //   Use case c5: Check whether to update or delete
        if (this.isEdit) {
          this.updateArticle(this.article);
        } else {
          this.createArticle(this.article);
        }
      }

      this.errors = [];

      if (!this.article.title) {
        this.errors.push("Title required.");
      }
      if (!this.article.description) {
        this.errors.push("Description required.");
      }
      if (!this.article.body) {
        this.errors.push("Body required.");
      }
    },
    createArticle(article) {
      //   Use case c4: Send a POST HTTP request to the API endpoint with the article in the request body
      this.$http
        .post(`${process.env.VUE_APP_API_URL}articles`, { article: article, email: localStorage.userEmail })
        .then(function() {
          this.$router.push({ path: "/" });
        });
    },
    updateArticle(article) {
      //   Use case c5: Send a PUT HTTP request to the API endpoint with the article ID in the request params 
      // and the article in the request body
      this.$http
        .put(`${process.env.VUE_APP_API_URL}articles/${article.id}`, article)
        .then(function() {
          this.$router.push({ path: "/" });
        });
    }
  },
  created: function() {
    //Use case c5: Get article ID from params, if exists
    if (this.$route.params.articleId) {
      // set reference to whether the user is editing or adding
      this.isEdit = true;
      //Get the article from the external API by its ID
      this.$http
        .get(
          `${process.env.VUE_APP_API_URL}articles/${
            this.$route.params.articleId
          }`
        )
        .then(function(data) {
          //Set the "article" data variable to the article that was retrieved from the external API
          this.article = data.body.article;
        });
    }
  }
};
</script>

<style scoped>
form div {
  padding: 10px 0;
  width: 300px;
}
form label {
  display: block;
}
form input:not([type="submit"]),
form textarea {
  width: 100%;
}
</style>