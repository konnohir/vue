<template>
  <div id="app">
    <header class="navbar navbar-expand-md navbar-dark bg-dark p-0">
      <h1>
        <router-link to="/" class="navbar-brand">BaseEnv4</router-link>
      </h1>
      <template v-if="isLoggedIn">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <nav class="collapse navbar-collapse" id="navbar">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/users" class="nav-link">Users</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">{{user.email}}</router-link>
            </li>
          </ul>
        </nav>
      </template>
    </header>
    <main class="container-fluid">
      <div class="py-3">
        <router-view v-if="isReady" @login="login" />
      </div>
    </main>
    <footer>
      <p class="text-center border-top">© 2020 footer</p>
    </footer>
  </div>
</template>

<script>

export default {
  data() {
    return {
      isReady: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUser;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    }
  },

  async created() {
    // 自動ログイン
    console.log("created");
    await this.login();
    this.isReady = true;
  },

  methods: {
    async login(identify = null) {
      if (this.isLoggedIn) {
        return this.isLoggedIn;
      }
      const user = await new Promise(resolve =>
        setTimeout(
          () =>
            resolve(
              true || identify
                ? { email: "user01@example.com", role_id: 1 }
                : null
            ),
          300
        )
      );
      this.$store.commit("setUser", user);

      if (!this.isLoggedIn && this.$route.fullPath !== "/login") {
        this.$router.push("/login");
      }
      if (this.isLoggedIn && this.$route.fullPath === "/login") {
        this.$router.push("/");
      }
      if (this.isLoggedIn) {
        this.$router.beforeEach(this.checkRole);
        const route = await new Promise(resolve =>
          this.checkRole(this.$route, this.$route, resolve)
        );
        if (route) {
          this.$router.push(route);
        }
      }

      return this.isLoggedIn;
    },

    checkRole(to, from, next) {
      console.log("check" + this.user.role_id);
      return next();
    }
  }
};
</script>
