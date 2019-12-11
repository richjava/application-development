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
  }
};
</script>

<style></style>