<template>
  <div class="pagination-wrap mb-2">
    <ul class="pagination pagination-sm">
      <li class="page-item disabled">
        <span class="page-link">検索結果: {{count}}件</span>
      </li>
      <li class="page-item" v-show="showFirstPage">
        <a class="page-link" :href="pageHref(firstPage)" @click.prevent="paging(firstPage)">&lt;&lt;</a>
      </li>
      <li
        class="page-item"
        :class="{active: page == pageNo}"
        v-for="pageNo in pageList"
        v-bind:key="pageNo"
      >
        <a class="page-link" :href="pageHref(pageNo)" @click.prevent="paging(pageNo)">{{pageNo}}</a>
      </li>
      <li class="page-item" v-show="showLastPage">
        <a class="page-link" :href="pageHref(lastPage)" @click.prevent="paging(lastPage)">&gt;&gt;</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    value: { type: Number, required: true },
    count: { type: Number, required: true },
    perPage: { type: Number, required: true },
    modulus: { type: Number, required: false, default: 2 }
  },
  data() {
    return {
      page: this.value
    };
  },
  computed: {
    showFirstPage() {
      return this.page !== 1;
    },
    showLastPage() {
      return this.page !== this.lastPage;
    },
    firstPage() {
      return 1;
    },
    lastPage() {
      return (
        parseInt(this.count / this.perPage) + (this.count % this.perPage !== 0)
      );
    },
    pageList() {
      const pageList = [];
      let begin = this.page - this.modulus;
      if (begin > this.lastPage - this.modulus * 2) {
        begin = this.lastPage - this.modulus * 2;
      }
      if (begin < this.firstPage) {
        begin = this.firstPage;
      }
      let end = this.page + this.modulus;
      if (end <= this.modulus * 2) {
        end = this.modulus * 2 + 1;
      }
      if (end > this.lastPage) {
        end = this.lastPage;
      }
      if (begin > end) {
        throw new Error("pagination error");
      }
      for (let i = begin; i <= end; i++) {
        pageList.push(i);
      }
      return pageList;
    }
  },
  methods: {
    pageHref(page) {
      return this.$route.fullPath
    },
    paging(page) {
      this.page = page;
      this.$emit("input", page);
    }
  }
};
</script>