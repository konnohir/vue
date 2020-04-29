<template>
  <app-page v-model="filter" @onUpdate="onUpdate">
    <!-- タイトル -->
    <h2 class="mb-2">ユーザーマスタ</h2>
    <!-- 検索条件入力エリア -->
    <index-filter v-bind.sync="filter" @onUpdate="onUpdate"/>
    <!-- 一覧表示エリア -->
    <index-table v-bind.sync="table" />
  </app-page>
</template>

<script>
import IndexFilter from "./index.filter";
import IndexTable from "./index.table";

/**
 * ユーザー一覧画面
 */
export default {
  /**
   * この画面で使用するコンポーネント
   */
  components: {
    IndexFilter,
    IndexTable
  },
  /**
   * この画面で使用するデータ
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
        totalRows: 0,
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
    async onUpdate() {
      const response = await this.$store.dispatch('get', {
        url: '/users',
        query: this.$route.query,
      });
      if (response === null) {
        return;
      }
      this.table.users = response.users
      this.table.totalRows = response.totalRows;
    },
  }
};
</script>