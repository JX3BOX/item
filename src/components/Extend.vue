<template>
  <div class="m-extend" :class="{isHome : isHome}">
    <!-- <ins
        class="adsbygoogle"
        style="display:block;width:100%;overflow:hidden;"
        data-ad-client="ca-pub-4388499329141185"
        data-ad-slot="9773281887"
        data-ad-format="auto"
        data-full-width-responsive="true"
    ></ins> -->
    <RightSideMsg>
      <em>官方反馈交流Q群</em> :
      <strong>
        <a href="https://jq.qq.com/?_wv=1027&k=5S50j08">614370825</a>
      </strong>
    </RightSideMsg>

    <div class="m-my-item-plans">
      <h3 class="c-sidebar-right-title">
        <i class="u-icon el-icon-s-order"></i>
        <span>我的清单</span>
        <a class="fr el-button el-button--primary el-button--mini" :href="publish_url(`item_plan`)">
          <i class="el-icon-document-add"></i>
          <span>创建</span>
        </a>
      </h3>
      <template v-if="$store.state.my_item_plans && $store.state.my_item_plans.length">
        <router-link class="m-my-item-plan" v-for="(plan, key) in $store.state.my_item_plans" :key="key"
                     :to="{name:'plan_view', params: {plan_id: plan.id}}">
          <div class="fr m-ctrls">
            <div @click="edit_plan($event, plan.id)">
              <i class="el-icon-edit u-edit" title="编辑"></i>
            </div>
            <div @click="delete_plan($event, plan.id)">
              <i class="el-icon-delete u-delete" title="删除"></i>
            </div>
          </div>
          <h5 class="u-title">
            <span v-if="plan.type==1" class="u-type" style="background-color:#409EFF">道具清单</span>
            <span v-if="plan.type==2" class="u-type" style="background-color:#F0787A">装备清单</span>
            <span v-text="plan.title"></span>
          </h5>
          <p class="u-description" v-text="plan.description"></p>
          <div>
            <img class="u-avatar" :src="plan.user_avatar">
            <span class="u-nickname" v-text="plan.user_nickname"></span>
          </div>
        </router-link>
      </template>
      <div class="u-tip" v-else-if="user.id">暂无物品清单记录</div>
      <div class="u-tip" v-else>请先进行登录</div>
    </div>

    <div class="m-hot-items">
      <h3 class="c-sidebar-right-title">
        <img class="u-icon" svg-inline src="../assets/img/rank.svg"/>
        <span>热门物品</span>
      </h3>
      <router-link class="m-hot-item" v-for="(item, key) in hot_items" :key="key"
                   :to="{name:'view', params: {item_id: item.id}}">
        <div class="u-icon">
          <ItemIcon :item="item"/>
        </div>
        <div class="m-content">
                    <span class="u-title" :style="{color:$options.filters.item_color(item.Quality)}">
                        <i class="el-icon-medal"></i>
                        <span v-text="` ${item.Name}`"></span>
                    </span>
          <span class="u-desc" v-html="` ${item.DescHtml}`"></span>
          <span class="u-rank" v-if="item.rank">
                        <i class="el-icon-grape"></i>
                        <span v-text="`七天 - ${item.rank['7days']}`"></span>
                        <i class="el-icon-pear"></i>
                        <span v-text="`三十天 - ${item.rank['30days']}`"></span>
                    </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  const {JX3BOX} = require("@jx3box/jx3box-common");
  import User from "@jx3box/jx3box-common/js/user.js";
  import ItemIcon from "@/components/ItemIcon";
  import {getRank} from "../service/stat.js";
  import {get_items} from "../service/item.js";
  import {get_my_item_plans, delete_item_plan} from "../service/item_plan.js";

  export default {
    name: "Extend",
    props: [],
    data: function () {
      return {
        isHome: true,
        hot_items: null,
        user: User.getInfo(),
      };
    },
    components: {
      ItemIcon,
    },
    methods: {
      edit_plan($event, plan_id) {
        $event.preventDefault();
        location.href = this.publish_url(`item_plan/${plan_id}`);
        return false;
      },
      delete_plan($event, plan_id) {
        $event.preventDefault();
        this.$confirm('确认是否删除该物品清单？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_item_plan(plan_id).then(
            (data) => {
              data = data.data;
              if (data.code === 200) {
                this.$message.success(data.message);
                // 获取我的清单
                get_my_item_plans();
              } else {
                this.$message.error(data.message);
              }
            }
          );
        });
        return false;
      },
      checkIsHome: function () {
        this.isHome = this.$route.name == 'home' || !this.$route.name
      },
      chuck(arr, number = 3) {
        let output = [];
        for (let i = 0; i < arr.length; i += number) {
          output.push(arr.slice(i, i + number))
        }
        return output;
      },
      img_error_handle(e) {
        e.target.src = `${JX3BOX.__ossRoot}image/common/nullicon.png`;
      },
      publish_url(val) {
        return `${JX3BOX.__Links.dashboard.publish}#/${val}`;
      },
    },
    watch: {
      '$route.name': function (newpath) {
        this.checkIsHome()
      }
    },
    mounted: function () {
      // 获取我的清单
      get_my_item_plans();

      // 获取热门物品
      getRank().then((data) => {
        data = data.data;

        let ranks = [],
          item_ids = [];
        for (let i in data) {
          let name = this.$_.get(data, `${i}.name`, '-');
          let item_id = this.$_.get(name.split('-'), 1, '');
          if (item_id) {
            item_ids.push(item_id);
            ranks[item_id] = this.$_.get(data, `${i}.value`, {});
          }
        }
        item_ids = item_ids.slice(1, 15);

        get_items({ids: item_ids, limit: item_ids.length}).then((data) => {
          data = data.data;
          if (data.code === 200) {
            data = data.data.data;

            // 使用id作为键值
            let items = {};
            for (let i in data) items[data[i].id] = data[i];

            // 数据填充保持原有排序
            let output = [];
            for (let i in item_ids) {
              let id = item_ids[i];
              let item = items[id];
              if (item) {
                item.rank = ranks[id];
                output.push(item);
              }
            }

            this.hot_items = output;
          }
        });
      });

      this.checkIsHome();
    },
  };
</script>

<style lang="less">
  @import '../assets/css/components/extend.less';
</style>
