<template>
  <table class="table-wrap mb-2">
    <thead>
      <tr>
        <!-- 全選択チェックボックス -->
        <th>
          <all-checkbox
            :selected="selectedData"
            :all="data"
            @input="$emit('update:selectedData', $event)"
          />
        </th>
        <!-- 表ヘッダ -->
        <slot></slot>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data" :key="row.id">
        <!-- 行選択チェックボックス -->
        <td>
          <row-checkbox
            :value="row"
            :checked="selectedData"
            @input="$emit('update:selectedData', $event)"
          />
        </td>
        <!-- 行データ -->
        <slot name="tbody" v-bind:row="row">{{row}}</slot>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  /**
   * 引数
   */
  props: {
    data: Array,
    selectedData: Array
  }
};
</script>
<style>
.table-wrap {
  display: block;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  border: solid 1px black;
  min-height: 584px;
  width: 100%;
}

.table-wrap th,
.table-wrap td {
  border-bottom: solid 1px gray;
  border-right: solid 1px gray;
  vertical-align: top;
}

.table-wrap thead th {
  background: lightsteelblue;
  color: black;
  font-weight: normal;
  border-top-style: none;
}

.table-wrap tbody tr:hover {
  background: #ccffcc;
}

.table-wrap th:first-child,
.table-wrap td:first-child {
  border-left-style: none;
}

.table-wrap th:last-child,
.table-wrap td:last-child {
  border-right-style: none;
}

.table-wrap tr:nth-child(even) {
  background: #eee;
}

.table-wrap thead a {
  color: black;
  font-weight: normal;
}

.table-wrap .asc:after {
  content: "▽";
  font-size: 50%;
}

.table-wrap .desc:after {
  content: "△";
  font-size: 50%;
}
.pagination-wrap {
  float: right;
}

.pagination-wrap + * {
  clear: both;
}

.pagination-wrap .pagination {
  margin-bottom: 0;
}
</style>