<template>
  <div class="container">
    <div class="jumbotron">
      <h4>Select News Source</h4>
      <!-- Use case c2 - refactored: Call the "emitSourceChanged" method on change of the dropdown -->
      <select v-on:change="emitSourceChanged">
        <option value="">Please select news source...</option>
        <option
          v-for="source in sources"
          v-bind:key="source.id"
          v-bind:value="source.id"
          >{{ source.name }}</option
        >
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "SourceSelection",
  data: function() {
    return {
      sources: []
    };
  },
  methods: {
    // Use case c2c - refactored: Handle the "change" event of the sources select element. Emit a custom event called "$sourceChanged".
    //The parent component (Home.vue) will handle the "$sourceChanged event".
    emitSourceChanged: function(evt) {
      this.$emit("$sourceChanged", evt.target.value);
    }
  },
  created: function() {
    this.$http
      .get(
        "https://newsapi.org/v2/sources?apiKey=bd9ea595a2cf470fbf9a9f9eccfeb3f5"
      )
      .then(function(data) {
        this.sources = data.body.sources;
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
