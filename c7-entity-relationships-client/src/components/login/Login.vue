<template>
  <div>
    <h1>Login</h1>
    <!-- Entity relationships c7: c7: Login form -->
    <form @submit="checkForm">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>

      <div>
        <label for="notname">Email</label>
        <input v-model="user.email" type="text" name="notname" placeholder="Email" />
      </div>

      <!-- H o n e y p o t -->
      <label class="ohnohoney" for="name"></label>
      <input
        class="ohnohoney"
        autocomplete="off"
        type="text"
        id="name"
        name="name"
        placeholder="Your name here"
      />
      <label class="ohnohoney" for="email"></label>
      <input
        class="ohnohoney"
        autocomplete="off"
        type="email"
        id="email"
        name="email"
        placeholder="Your e-mail here"
      />

      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</template>

<script>
// Entity relationships c7:  Import EventBus
import { EventBus } from '../../event-bus';
export default {
  name: "LoginEditor",
  data: function() {
    return {
      errors: [],
      user: {
        email: ''
      }
    };
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();
      if (this.user.email) {
          this.login(this.user);
      }
      this.errors = [];
      if (!this.user.email) {
        this.errors.push("Email required.");
      }
    },
    // NOTE: This is a very simple auth system - don't use it for production apps
    login(user) {
      // Entity relationships c7: c7: Send a POST HTTP request to the API endpoint with the user in the request body
      this.$http
        .post(`${process.env.VUE_APP_API_URL}users/login`, user)
        .then(function(response) {
          if(response.body.user){
          //add logged in status and user email to local storage
          localStorage.loggedIn = true;
          localStorage.userEmail = user.email;
          //emit event for Header to recieve
          EventBus.$emit('$loggedIn', true);
          this.$router.push({ path: "/" });
          }
        }, function(response) {  
            //error callback 
            this.errors.push(response.body.message);
        });
    },
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
.ohnohoney {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 0;
  width: 0;
  z-index: -1;
}
</style>
