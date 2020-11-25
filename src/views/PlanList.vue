<template>
  <div class="m-item-index m-item-plan-list">
    <el-divider content-position="left"><span style="color:#999999">物品清单</span></el-divider>
    <div class="m-plans">
      <template v-if="item_plans && item_plans.length">
        <div v-for="(plan, key) in item_plans" :key="key" class="m-plan">
          <div class="u-updated" v-text="$options.filters.date_format(plan.updated)"></div>
          <div class="u-author">
            <img class="u-avatar" :src="plan.user_avatar | resolveAvatarPath" :alt="plan.user_nickname"/>
            <a class="u-nickname" :href="plan.user_id | author_url" v-text="plan.user_nickname"></a>
          </div>
          <div class="u-title">
            <span v-if="plan.type==1" class="u-type" style="background-color:#409EFF">道具清单</span>
            <span v-if="plan.type==2" class="u-type" style="background-color:#F0787A">装备清单</span>
            <router-link class="u-name" v-text="plan.title"
                         :to="{name: 'plan_view',params: { plan_id: plan.id }}"></router-link>
          </div>
          <router-link class="u-description" v-text="plan.description"
                       :to="{name: 'plan_view',params: { plan_id: plan.id }}"></router-link>
        </div>
      </template>
      <el-alert v-else center title="😂 暂无物品清单" class="m-plan-null" type="info" :closable="false"></el-alert>

    </div>
    <el-pagination
        background
        :total="item_plans_total"
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
  import {get_item_plans} from "../service/item_plan.js";

  export default {
    name: "PlanList",
    data: function () {
      return {
        item_plans: null,
        item_plans_total: 0,
        page: 1,
        length: 20,
      };
    },
    methods: {
      page_change_handle(page) {
        this.$router.push({name: "plan_list", query: {page: page}});
      },
    },
    watch: {
      $route: {
        immediate: true,
        handler() {
          this.page = parseInt(this.$route.query.page);
          // 获取物品清单列表
          get_item_plans({page: this.page, limit: this.length}).then(
            (data) => {
              data = data.data;
              if (data.code === 200) {
                this.item_plans = data.data.data;
                this.item_plans_total = data.data.total;
              } else {
                this.item_plans = null;
                this.item_plans_total = 0;
              }
            }
          );
        },
      },
    },
  };
</script>

<style lang="less">
  @import "../assets/css/views/plan_list.less";
</style>
