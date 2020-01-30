<template>
  <div>
    <h1>Sign up</h1>
    <!-- Use case c7: Login form -->
    <form @submit="checkForm">
      <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
          <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
        </ul>
      </p>
      <div>
        <label for="not-first-name">First name</label>
        <input v-model="user.firstName" type="text" name="not-first-name" placeholder="First name" />
      </div>
      <div>
        <label for="not-last-name">Last name</label>
        <input v-model="user.lastName" type="text" name="not-last-name" placeholder="Last name" />
      </div>
      <div>
        <label for="not-email">Email</label>
        <input v-model="user.email" type="text" name="not-email" placeholder="email" />
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
  name: "RegisterEditor",
  data: function() {
    return {
      errors: [],
      user: {
        firstName: "",
        lastName: "",
        email: ""
      }
    };
  },
  methods: {
    checkForm: function(e) {
      e.preventDefault();
      if (this.user.email) {
        this.register(this.user);
      }else {
        this.displayErrors(this.user);
      }
    },
    displayErrors: function(user) {
      this.errors = [];
      if (!user.firstName) {
        this.errors.push("First name required.");
      }
      if (!user.lastName) {
        this.errors.push("Last name required.");
      }
      if (!user.email) {
        this.errors.push("Email required.");
      }
    },
    // NOTE: This is a very simple auth system - don't use it for production apps
    register(user) {
      // Entity relationships c7: Send a POST HTTP request to the API endpoint with the user in the request body
      this.$http
        .post(`${process.env.VUE_APP_API_URL}users/register`, user)
        .then(function(response) {
          if (response.body.user) {
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

/* honeypot styles */
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
