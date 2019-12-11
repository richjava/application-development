import Vue from "vue";

// Use-case 1: Import vue-router dependency
import VueRouter from "vue-router";

// Use-case 1: Import vue-resource dependency
import VueResource from "vue-resource";

import Home from "./components/home/Home.vue";
import About from "./components/about/About.vue";

// Use-case 3: Import ArticleDetail component
import ArticleDetail from "./components/article-detail/ArticleDetail.vue";

// Use-case 4: Import ArticleEditor component
import ArticleEditor from "./components/article-editor/ArticleEditor.vue";

import App from "./App.vue";

// Use-case 1: Add vue-router dependency
Vue.use(VueRouter);

// Use-case 2: Add vue-resource dependency for making HTTP requests
Vue.use(VueResource);

// Use-case 4: Add "article-editor" route
const routes = [{
  path: "/",
  component: Home
},
{
  path: '/article/:articleId/details', //includes placeholder for article id
  name: 'details',
  component: ArticleDetail,
  props: true, //this enables route params
},
{
  path: '/article-editor',
  name: 'article-editor',
  component: ArticleEditor
},
{
  path: "/about",
  component: About
}];

// Use-case 1: Create a new instance of the VueRouter object
const router = new VueRouter({
  routes,
  mode: "history"
});

Vue.config.productionTip = false;

// Use-case 1: Pass the router object to the Vue object
new Vue({
  render: h => h(App),
  router
}).$mount("#app");
