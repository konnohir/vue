<template>
  <div class="home">
    <div>
      Email:
      <input v-model="email" />
    </div>
    <div>
      Password:
      <input v-model="password" />
    </div>
    <div>
      <button @click="doLogin">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLoggedIn;
    }
  },
  methods: {
    doLogin() {
      this.$emit("login", { email: this.email, password: this.password });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isLogin) {
      return next(false);
    }
    next();
  }
};
</script>