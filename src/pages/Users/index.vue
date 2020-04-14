<template>
  <AppPage v-model="filter" @onUpdate="onUpdate">
    <!-- タイトル -->
    <h2 class="mb-2">ユーザーマスタ</h2>
    <!-- 検索条件入力エリア -->
    <index-filter v-bind.sync="filter"/>
    <!-- 一覧表示エリア -->
    <index-table v-bind.sync="table" :currentPage="parseInt(filter.page)" />
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
        email: "",
        role_name: ""
      },
      /**
       * テーブル
       */
      table: {
        /**
         * 1ページ当たりの表示件数
         */
        perPage: 20,
        /**
         * 合計データ件数
         */
        totalRows: 0,
        /**
         * データ
         */
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
      this.table.totalRows = this.table.users.length;
    },
  }
};
</script>