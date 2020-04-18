<template>
  <AppPage v-model="filter" @onUpdate="onUpdate">
    <!-- タイトル -->
    <h2 class="mb-2">ユーザーマスタ</h2>
    <!-- 検索条件入力エリア -->
    <index-filter v-bind.sync="filter" @onUpdate="onUpdate"/>
    <!-- 一覧表示エリア -->
    <index-table v-bind.sync="table" />
  </AppPage>
</template>

<script>
import IndexFilter from "./index.filter";
import IndexTable from "./index.table";

export default {
  /**
   * コンポーネント
   */
  components: {
    IndexFilter,
    IndexTable
  },
  /**
   * データ
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
        // 合計データ件数
        totalRows: 0,
        // ユーザー一覧
        users: [],
      }
    };
  },
  /**
   * イベント
   */
  methods: {
    /**
     * 一覧更新
     */
    onUpdate() {
      console.log("%conUpdate", "background:orange");
      this.table.users = [
        {
          id: 1,
          email: (this.filter.email || "user01") + "@example.com",
          role: {
            name: "管理者"
          },
          password_issue: true,
          login_failed_count: 0
        }
      ];
      this.table.users.push(
        {
          id: 2,
          email: ("user02") + "@example.com",
          role: {
            name: "管理者"
          },
          password_issue: false,
          login_failed_count: 0
        }
      );
      this.table.totalRows = this.table.users.length * 1001;
    },
  }
};
</script>