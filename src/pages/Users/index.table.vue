<template>
  <section>
    <!-- アクションボタン -->
    <b-button-group class="mb-2">
      <!-- 新規作成ボタン -->
      <b-button variant="outline-primary" @click="doAdd">新規作成</b-button>
      <!-- 編集ボタン -->
      <b-button variant="outline-primary" @click="doEdit">編集</b-button>
      <!-- パスワード再発行ボタン -->
      <b-button variant="outline-success">パスワード再発行</b-button>
      <!-- アカウントロックボタン -->
      <b-button variant="outline-success">アカウントロック</b-button>
      <!-- ロック解除ボタン -->
      <b-button variant="outline-success">ロック解除</b-button>
      <!-- 削除ボタン -->
      <b-button variant="outline-danger">削除</b-button>
    </b-button-group>

    <!-- ページネーション -->
    <table-pagination :currentPage="currentPage" :totalRows="totalRows" :perPage="20" />

    <!-- 検索結果リスト -->
    <table-wrap :data="users" :selectedData.sync="selectedUsers">
      <!-- メールアドレス -->
      <table-header sort="email" class="w-100">メールアドレス</table-header>
      <!-- 権限 -->
      <table-header sort="Roles.name">権限</table-header>
      <!-- アカウントロック -->
      <table-header sort="login_failed_count">アカウントロック</table-header>
      <!-- パスワード発行 -->
      <table-header sort="password_issue">パスワード発行</table-header>
      <!-- 行データ -->
      <template #tbody="{row: user}">
        <!-- メールアドレス -->
        <td>
          <router-link :to="'/users/view/' + user.id">{{user.email}}</router-link>
        </td>
        <!-- 権限 -->
        <td>{{user.role.name}}</td>
        <!-- アカウントロック -->
        <td>{{user.login_failed_count >= 5 ? '〇' : ''}}</td>
        <!-- パスワード発行 -->
        <td>{{user.password_issue ? '〇' : ''}}</td>
      </template>
    </table-wrap>
  </section>
</template>

<script>
export default {
  /**
   * 引数
   */
  props: {
    /**
     * データ件数
     */
    totalRows: Number,
    /**
     * ユーザー一覧
     */
    users: Array
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * ページ番号
     */
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    }
  },
  /**
   * データ
   */
  data() {
    return {
      selectedUsers: []
    };
  },
  /**
   * イベント
   */
  methods: {
    /**
     * 新規追加ボタン押下
     */
    doAdd() {
      this.$router.push("/users/add");
    },
    /**
     * 編集ボタン押下
     */
    doEdit() {
      if (this.selectedUsers.length !== 1) {
        this.$store.commit("error", "1件選択してください。");
        this.$bvModal.msgBoxOk(`1件選択してください。`, {
          title: "エラー",
          autoFocusButton: "ok",
          noCloseOnBackdrop: true,
          hideHeaderClose: false
        });
        return;
      }
      this.$router.push("/users/edit/" + this.selectedUsers[0].id);
    }
  }
};
</script>