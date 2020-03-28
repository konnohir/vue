<template>
  <section>
    <h2 class="mb-2">ユーザーマスタ</h2>
    <!-- 検索条件エリア -->
    <my-filter-area :filter="filter" @change="onUpdate">
      <!-- メールアドレス -->
      <my-input v-model="filter.email" label="メールアドレス" id="filter-email" />
      <!-- 説明 -->
      <my-input v-model="filter.desc" label="説明" id="filter-desc" />
      <!-- チェックボックス -->
      <div class="form-group">
        <b-check v-model="filter.check1" value="1" id="filter-check1">check1</b-check>
        <b-check v-model="filter.check1" value="2" id="filter-check2">check2</b-check>
      </div>
    </my-filter-area>
    <!-- アクションボタン -->
    <b-button-group class="mb-2">
      <b-button variant="outline-primary">新規作成</b-button>
      <b-button variant="outline-primary">編集</b-button>
      <b-button variant="outline-success">パスワード再発行</b-button>
      <b-button variant="outline-success">アカウントロック</b-button>
      <b-button variant="outline-success">ロック解除</b-button>
      <b-button variant="outline-danger">削除</b-button>
    </b-button-group>
    <!-- ページネーション -->
    <pagination v-model="paging.page" v-bind="paging" />
    <!-- 検索結果リスト -->
    <div class="table-wrap mb-2">
      <table>
        <thead>
          <tr>
            <th>
              <div class="custom-control custom-checkbox">
                <input type="checkbox" id="checkAll" class="custom-control-input" />
                <label class="custom-control-label" for="checkAll"></label>
              </div>
            </th>
            <th class="w-100">
              <a href="/users?sort=Users.email&amp;direction=asc">メールアドレス</a>
            </th>
            <th>
              <a href="/users?sort=Roles.id&amp;direction=asc">権限</a>
            </th>
            <th>
              <a href="/users?sort=Users.login_failed_count&amp;direction=asc">アカウントロック</a>
            </th>
            <th>
              <a href="/users?sort=Users.password_issue&amp;direction=asc">パスワード発行</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>
              <div class="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  id="checkRow1"
                  name="checkRow1"
                  value="1"
                  data-lock="2020-01-18 11:52:37.093518"
                  class="custom-control-input checkRow"
                />
                <label class="custom-control-label" for="checkRow1"></label>
              </div>
            </td>
            <td>
              <router-link to="/users/view/1">{{user.email}}</router-link>
            </td>
            <td>{{user.role.name}}</td>
            <td>{{user.login_failed_count >= 5 ? '〇' : ''}}</td>
            <td>{{user.password_issue ? '〇' : ''}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>

export default {
  data() {
    return {
      filter: { check1: [] },
      paging: {
        count: 897,
        perPage: 20,
        page: 1
      },
      users: []
    };
  },
  methods: {
    onUpdate(newValue) {
      this.filter = newValue;
      this.users = [
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
    }
  }
};
</script>