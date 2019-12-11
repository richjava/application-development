<template>
  <div>
    <h1>Articles</h1>
    <!-- Use case c2c - refactored: Display the custom components.  -->

<!-- Use case c2c - refactored: Listen for the custom "$sourceChanged" event (sent from the NewsList component). When the 
event is received, it will call this component's "sourceChanged" method -->
    <SourceSelection v-on:$sourceChanged="changeSource" />

    <!-- Use case c2c - refactored: Bind the source data variable so we can use it in the component as a prop-->
    <NewsList v-bind:source="source" />
  </div>
</template>

<script>
// Use case c2c - refactored: Import the components
import SourceSelection from "./SourceSelection";
import NewsList from "./NewsList";

export default {
  name: "Home",
  data: function() {
    return {
      // Use case c2c - refactored: The value of this variable will be passed to the NewsList component as a prop
      source: ""
    };
  },
  components: {
    // Use case c2c - refactored: List of components used
    SourceSelection,
    NewsList
  },
  methods: {
    // Use case c2c - refactored: This will get called whenever the "$sourceChanged" event is emitted
    changeSource: function(source) {
      this.source = source;
    }
  }
};
</script>

<style scoped></style>
