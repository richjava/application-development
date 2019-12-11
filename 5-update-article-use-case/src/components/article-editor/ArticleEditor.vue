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
        //   Use case c4: Send a POST HTTP request to the API endpoint with the article in the request body
        this.$http
        .post(`${process.env.VUE_APP_API_URL}articles`, this.article)
        .then(function() {
            //go to list page
            this.$router.push({ path: '/' })
        });
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
form input:not([type='submit']), form textarea {
    width: 100%;
}
</style>