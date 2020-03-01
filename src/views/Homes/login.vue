<template>
  <div class="home">
    <div>{{message}}</div>
    <div>
      Email:
      <input v-model="email" />
    </div>
    <div>
      Password:
      <input v-model="password" />
    </div>
    <div>
      <button @click="doLogin" :disabled="isProcess">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomesLogin",
  data() {
    return {
      email: "",
      password: "",
      isProcess: false,
      user: null,
      message: ""
    };
  },
  methods: {
    doLogin: async function() {
      this.isProcess = true;
      this.message = "ログイン中";
      const isLoggedIn = await this.$session
        .login(this.email, this.password)
        .catch(() => {
          console.error("ログインエラー");
          this.isProcess = false;
        });
      if (isLoggedIn) {
        this.$router.push('/')
      } else {
        this.message = "ログインに失敗しました。";
      }
      this.isProcess = false;
    }
  }
};
</script>