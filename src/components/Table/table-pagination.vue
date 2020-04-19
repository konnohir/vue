<template>
  <div class="pagination-wrap mb-2">
    <ul class="pagination pagination-sm">
      <li class="page-item disabled">
        <span class="page-link">検索結果: {{totalRows}}件</span>
      </li>
      <pagination-link :page="firstPage" v-if="showFirstPage">&lt;&lt;</pagination-link>
      <pagination-link
        :page="page"
        :currentPage="currentPage"
        v-for="page in pageList"
        :key="page"
      >{{page}}</pagination-link>
      <pagination-link :page="lastPage" v-if="showLastPage">&gt;&gt;</pagination-link>
    </ul>
  </div>
</template>
<script>
export default {
  /**
   * 引数
   */
  props: {
    currentPage: Number,
    totalRows: Number,
    perPage: Number,
    modulus: { type: Number, default: 2 }
  },
  computed: {
    /**
     * 先頭ページ
     */
    firstPage() {
      return 1;
    },
    /**
     * 先頭ページへのリンクを表示するか
     */
    showFirstPage() {
      return this.currentPage > this.firstPage + this.modulus;
    },
    /**
     * 最終ページ
     */
    lastPage() {
      return (
        parseInt(this.totalRows / this.perPage) +
        (this.totalRows % this.perPage !== 0)
      );
    },
    /**
     * 最終ページへのリンクを表示するか
     */
    showLastPage() {
      return this.currentPage < this.lastPage - this.modulus;
    },
    /**
     * 開始ページ
     */
    begin() {
      let begin = this.currentPage - this.modulus;
      if (begin > this.lastPage - this.modulus * 2) {
        begin = this.lastPage - this.modulus * 2;
      }
      if (begin < this.firstPage) {
        begin = this.firstPage;
      }
      return begin;
    },
    /**
     * 終了ページ
     */
    end() {
      let end = this.currentPage + this.modulus;
      if (end <= this.modulus * 2) {
        end = this.modulus * 2 + 1;
      }
      if (end > this.lastPage) {
        end = this.lastPage;
      }
      return end;
    },
    /**
     * 表示するページ番号のリスト
     */
    pageList() {
      const pageList = [];
      if (this.begin >= this.end) {
        return pageList;
      }
      for (let i = this.begin; i <= this.end; i++) {
        pageList.push(i);
      }
      return pageList;
    }
  },
};
</script>