<template>
  <app-page v-model="filter" @onUpdate="onUpdate">
    <!-- ------------------------------------- -->
    <!-- タイトル -->
    <!-- ------------------------------------- -->
    <h2 class="mb-2">ユーザーマスタ</h2>

    <!-- ------------------------------------- -->
    <!-- 検索条件領域 -->
    <!-- ------------------------------------- -->
    <filter-section>
      <!-- メールアドレス -->
      <my-input v-model="filter.email" label="メールアドレス" />
      <!-- 権限 -->
      <my-input v-model="filter.role_name" label="権限" />
      <!-- 検索・条件クリアボタン -->
      <my-button-wrap>
        <my-button variant="outline-secondary" @click="doClear">条件クリア</my-button>
        <my-submit variant="outline-info" @click="doSearch">検索</my-submit>
      </my-button-wrap>
    </filter-section>

    <!-- ------------------------------------- -->
    <!-- 一覧表示領域 -->
    <!-- ------------------------------------- -->
    <section>
      <!-- アクションボタン -->
      <b-button-group class="mb-2">
        <!-- 新規作成ボタン -->
        <my-button variant="outline-primary" @click="doAdd">新規作成</my-button>
        <!-- 編集ボタン -->
        <my-button variant="outline-primary" @click="doEdit">編集</my-button>
        <!-- パスワード再発行ボタン -->
        <my-button variant="outline-success">パスワード再発行</my-button>
        <!-- アカウントロックボタン -->
        <my-button variant="outline-success">アカウントロック</my-button>
        <!-- ロック解除ボタン -->
        <my-button variant="outline-success">ロック解除</my-button>
        <!-- 削除ボタン -->
        <my-button variant="outline-danger">削除</my-button>
      </b-button-group>

      <!-- ページネーション -->
      <table-pagination :currentPage="currentPage" :totalRows="table.totalRows" :perPage="20" />

      <!-- 検索結果リスト -->
      <table-wrap :data="table.users" :selectedData.sync="selectedUsers">
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
            <router-link :to="'/users/edit/' + user.id">{{user.email}}</router-link>
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
  </app-page>
</template>

<script>
/**
 * ユーザー一覧画面
 */
export default {
  /**
   * この画面で使用する変数
   */
  data() {
    return {
      /**
       * 検索条件
       */
      filter: {
        // メールアドレス
        email: "",
        // 権限名
        role_name: ""
      },
      /**
       * テーブル
       */
      table: {
        // ユーザー一覧
        users: [],
        // 合計データ件数
        totalRows: 0
      },
      /**
       * 選択したユーザーの一覧
       */
      selectedUsers: []
    };
  },
  /**
   * 算出プロパティ
   */
  computed: {
    /**
     * 検索クエリ
     */
    searchQuery() {
      return {
        page: 1,
        email: this.filter.email,
        role_name: this.filter.role_name,
        sort: this.$route.query.sort,
        direction: this.$route.query.direction
      };
    },
    /**
     * 条件クリアクエリ
     */
    resetQuery() {
      return {};
    },
    /**
     * ページ番号
     */
    currentPage() {
      return parseInt(this.$route.query.page) || 1;
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * 一覧更新
     */
    async onUpdate() {
      const response = await this.$store.dispatch("get", {
        url: "/users",
        query: this.$route.query
      });
      if (response === null) {
        return;
      }
      this.table.users = response.users;
      this.table.totalRows = response.totalRows;
    },
    /**
     * 検索ボタン押下
     */
    doSearch() {
      this.$router.push({ query: this.searchQuery }).catch(e => {
        // Navigation Duplicated
        this.$emit("onUpdate");
      });
    },
    /**
     * 条件クリアボタン押下
     */
    doClear() {
      this.$router.push({ query: this.resetQuery }).catch(() => {
        // Navigation Duplicated
        this.$emit("onUpdate");
      });
    },
    /**
     * 新規追加ボタン押下
     */
    doAdd() {
      this.$router.push("/users/add");
    },
    /**
     * 編集ボタン押下
     */
    async doEdit() {
      if (this.selectedUsers.length !== 1) {
        this.$store.commit("error", "1件選択してください。");
        await this.$bvModal.msgBoxOk(`1件選択してください。`, {
          title: "エラー",
          autoFocusButton: "ok",
          noCloseOnBackdrop: true,
          hideHeaderClose: false,
          size: "sm",
          headerBgVariant: "danger",
          headerTextVariant: "light",
          headerClass: "py-1",
          footerClass: "py-1 ",
          okVariant: "outline-secondary"
        });
        this.$bvModal.msgBoxConfirm(
          "選択した最初のデータを表示します。よろしいですか？",
          {
            title: "警告",
            autoFocusButton: "ok",
            noCloseOnBackdrop: true,
            hideHeaderClose: false,
            size: "md",
            headerBgVariant: "warning",
            headerTextVariant: "dark",
            headerClass: "py-1",
            footerClass: "py-1 ",
            okVariant: "outline-primary",
            cancelVariant: "outline-secondary"
          }
        );
        return;
      }
      this.$router.push("/users/edit/" + this.selectedUsers[0].id);
    }
  }
};
</script>