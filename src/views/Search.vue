<template>
  <div class="m-cj-index">
    <search-bar />
    <Items :items="items"/>
    <el-pagination
        background
        :total="total"
        hide-on-single-page
        layout="prev, pager, next"
        :current-page="page"
        :page-size="length"
        prev-html="&laquo;"
        next-html="&raquo;"
        @current-change="page_change_handle"
    ></el-pagination>
  </div>
</template>

<script>
  import Items from "@/components/Items.vue";
  import Search from '@/components/Search.vue';

  const {JX3BOX} = require("@jx3box/jx3box-common");
  import {get_items_search} from '../service/item';

  export default {
    name: "Search",
    props: [],
    data: function () {
      return {
        items: [],
        total: 0,
        page: 1,
        length: 15,
      };
    },
    methods: {
      page_change_handle(page) {
        let query = {page: page};
        // 菜单筛选
        if (this.$route.query.auc_genre) query.auc_genre = this.$route.query.auc_genre;
        if (this.$route.query.auc_sub_type_id) query.auc_sub_type_id = this.$route.query.auc_sub_type_id;

        this.$router.push({
          name: "search",
          params: {keyword: this.$route.params.keyword},
          query: query,
        });
      },
    },
    components: {
      Items,
      'search-bar': Search,
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
          this.page = parseInt(this.$route.query.page);
          let params = {
            ids: this.$route.query.ids ? this.$route.query.ids.split(',') : [],
            keyword: this.$route.params.keyword,
            page: this.page,
            limit: this.length
          };
          // 菜单筛选
          if (this.$route.query.auc_genre) params.auc_genre = this.$route.query.auc_genre;
          if (this.$route.query.auc_sub_type_id) params.auc_sub_type_id = this.$route.query.auc_sub_type_id;

          get_items_search(params).then(
            (data) => {
              data = data.data;
              if (data.code === 200) {
                this.items = data.data.data;
                this.total = data.data.total;
              } else {
                this.items = null;
                this.total = 0;
              }
            }
          );
        },
      },
    },
  };
</script>
