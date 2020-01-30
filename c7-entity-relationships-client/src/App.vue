<template>
  <div>
    <MyHeader />
    <router-view></router-view>
    <MyFooter />
  </div>
</template>

<script>
import MyHeader from "./components/Header";
import MyFooter from "./components/Footer";

export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter
  },
  methods: {
  created: function() {
    // Entity relationships c7: Check user is logged in
    if(localStorage.loggedIn == false){
       this.$router.push({ path: "/login" });
    }
  }
  }
};
</script>

<style></style>