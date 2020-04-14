<template>
  <div class="pagination-wrap mb-2">
    <ul class="pagination pagination-sm">
      <li class="page-item disabled">
        <span class="page-link">検索結果: {{totalRows}}件</span>
      </li>
      <li class="page-item" v-if="showFirstPage">
        <a class="page-link" :href="href[firstPage]" @click.prevent="click(firstPage)">&lt;&lt;</a>
      </li>
      <li
        class="page-item"
        :class="{active: page == pageNo}"
        v-for="pageNo in pageList"
        v-bind:key="pageNo"
      >
        <a class="page-link" :href="href[pageNo]" @click.prevent="click(pageNo)">{{pageNo}}</a>
      </li>
      <li class="page-item" v-if="showLastPage">
        <a class="page-link" :href="href[lastPage]" @click.prevent="click(lastPage)">&gt;&gt;</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  /**
   * 引数
   */
  props: {
    currentPage: { type: [Number, String], required: false, default: 1 },
    totalRows: { type: Number, required: true },
    perPage: { type: Number, required: true },
    modulus: { type: Number, required: false, default: 2 }
  },
  computed: {
    /**
     * 先頭ページ
     */
    firstPage() {
      return 1;
    },
    /**
     * 最終ページ
     */
    lastPage() {
      return (
        parseInt(this.totalRows / this.perPage) + (this.totalRows % this.perPage !== 0)
      );
    },
    /**
     * 先頭ページへのリンクを表示するか判定
     */
    showFirstPage() {
      return this.pagecurrentPage > this.firstPage + this.modulus;
    },
    /**
     * 最終ページへのリンクを表示するか判定
     */
    showLastPage() {
      return this.pagecurrentPage < this.lastPage - this.modulus;
    },
    /**
     * ページング
     */
    pageList() {
      const pageList = [];
      let begin = this.pagecurrentPage - this.modulus;
      if (begin > this.lastPage - this.modulus * 2) {
        begin = this.lastPage - this.modulus * 2;
      }
      if (begin < this.firstPage) {
        begin = this.firstPage;
      }
      let end = this.pagecurrentPage + this.modulus;
      if (end <= this.modulus * 2) {
        end = this.modulus * 2 + 1;
      }
      if (end > this.lastPage) {
        end = this.lastPage;
      }
      if (begin >= end) {
        return pageList;
      }
      for (let i = begin; i <= end; i++) {
        pageList.push(i);
      }
      return pageList;
    },
    /**
     * 現在の検索条件
     */
    query() {
      return this.$route.query;
    },
    /**
     * aタグのhref
     */
    href() {
      const result = {}
      for(const pageNo in [this.firstPage, ...this.pageList, this.lastPage]) {
        result[pageNo] = this.$router.resolve({ query: {...this.query, pageNo} }).route.fullPath;
      }
      return result;
    }
  },
  /**
   * イベント
   */
  methods: {
    /**
     * ページネーションリンク押下
     */
    click(page) {
      this.$router.push({query: {...this.query, page}}).catch(()=>{});
    }
  }
};
</script>