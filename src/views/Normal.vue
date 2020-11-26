<template>
  <div class="m-item-index m-item-normal">
    <Search/>
    <div class="m-items-list">
      <Items :items="items"></Items>
    </div>
    <el-pagination
        background
        :total="items_total"
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
  const {JX3BOX} = require("@jx3box/jx3box-common");
  import Items from "@/components/Items.vue";
  import Search from '@/components/Search.vue';
  import {get_menu_items} from '../service/item';

  export default {
    name: "Normal",
    props: [],
    data: function () {
      return {
        items: null,
        items_total: 0,
        page: 1,
        length: 20,
        auc_genre: null,
        auc_sub_type: null,
      };
    },
    components: {
      Items,
      Search,
    },
    methods: {
      page_change_handle(page) {
        this.$router.push({
          name: "normal",
          params: {
            AucGenre: this.$store.state.sidebar.AucGenre,
            AucSubTypeID: this.$store.state.sidebar.AucSubTypeID,
          },
          query: {page: page},
        });
      },
    },
    mounted: function () {
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
          this.page = parseInt(this.$route.query.page);
          // 获取菜单物品列表
          get_menu_items({
            auc_genre: this.$store.state.sidebar.AucGenre,
            auc_sub_type_id: this.$store.state.sidebar.AucSubTypeID,
            page: this.page,
            limit: this.length,
          }).then(
            (data) => {
              data = data.data;
              if (data.code === 200) {
                this.items = data.data.data;
                this.items_total = data.data.total;
              }
            },
            () => {
              this.items = false;
            }
          );
        },
      },
    },
  };
</script>

<style lang="less">
  @import "../assets/css/views/normal.less";
</style>
