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
        <!-- ヘッダ -->
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