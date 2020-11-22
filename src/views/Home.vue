<template>
  <div class="m-item-index m-item-home">
    <div class="m-module no-border">
      <div class="m-head">
        <h4 class="u-title">
          <i class="el-icon-location-information"></i>
          <span> 便捷入口</span>
        </h4>
        <div class="u-other">
          <a class="u-feedback" target="_blank" :href="feedback">反馈建议 &raquo;</a>
        </div>
      </div>
      <div class="m-body">
        <ul class="m-qlinks">
          <li class="qlink">
            <a style="background-color:#FE7979;" target="_blank" href="https://www.jx3box.com/tool/18151/">
              <i class="el-icon-trophy"></i>
              <span> 游戏内看百科</span>
            </a>
          </li>
          <li class="qlink">
            <router-link
                :to="{ name: 'search', query: {ids:'5_24423,5_24424,5_24425,5_24426,5_24427,5_24428,5_24429,5_24430'} }">
              <i class="el-icon-edit-outline"></i>
              <span> 五行石合成</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <el-row :gutter="15">
      <el-col :xs="24" :md="12">
        <div class="m-module">
          <div class="m-head">
            <h4 class="u-title">最新攻略</h4>
          </div>
          <div class="m-body">
            <div class="wiki-post-list" v-if="newest_posts.length">
              <div class="wiki-post" v-for="(post, key) in newest_posts" :key="key">
                <div class="m-about-post">
                  <div class="m-user">
                    <div class="u-author">
                      <img class="u-icon" :src="post.user_avatar | resolveAvatarPath"
                           :alt="post.user_nickname"/>
                      <a :href="post.user_id | author_url" class="u-name" v-text="post.user_nickname"></a>
                    </div>
                    <div class="u-updated" v-text="$options.filters.date_format(post.updated)"></div>
                  </div>
                  <div class="m-wiki">
                    <div class="u-wiki">
                      <img class="u-icon" @error.once="img_error_handle"
                           :src="$options.filters.icon_url(post.source_icon_id)"/>
                      <router-link class="u-name" v-text="post.title"
                                   :to="{name: 'view',params: { item_id: post.source_id }}"></router-link>
                    </div>
                    <div class="u-level" v-text="'综合难度：' + $options.filters.star(post.level)"></div>
                    <div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
                  </div>
                </div>
                <div class="m-excerpt">
                  <router-link class="u-excerpt" v-html="ellipsis(post.excerpt)"
                               :to="{name: 'view',params: { item_id: post.source_id }}"></router-link>
                </div>
              </div>
            </div>
            <div v-else style="text-align:center">😂 暂无攻略</div>
          </div>
        </div>
      </el-col>
      <el-col :xs="24" :md="12">
        <div class="m-module">
          <div class="m-head">
            <h4 class="u-title">最新物品清单</h4>
          </div>
          <div class="m-body">
            <div class="wiki-post-list" v-if="newest_plans.length">
              <div class="wiki-post" v-for="(plan, key) in newest_plans" :key="key">
                <div class="m-about-post">
                  <div class="m-user">
                    <div class="u-author">
                      <img class="u-icon" :src="plan.user_avatar | resolveAvatarPath" :alt="plan.user_nickname"/>
                      <a :href="plan.user_id | author_url" class="u-name" v-text="plan.user_nickname"></a>
                    </div>
                    <div class="u-updated" v-text="$options.filters.date_format(plan.updated)"></div>
                  </div>
                  <div class="m-wiki">
                    <div class="u-wiki">
                      <span v-if="plan.type==1" class="u-type" style="background-color:#409EFF">道具清单</span>
                      <span v-if="plan.type==2" class="u-type" style="background-color:#F0787A">装备清单</span>
                      <router-link class="u-name" v-text="plan.title"
                                   :to="{name: 'plan_view',params: { plan_id: plan.id }}"></router-link>
                    </div>
                  </div>
                </div>
                <div class="m-excerpt">
                  <router-link class="u-excerpt" v-html="ellipsis(plan.description)"
                               :to="{name: 'plan_view',params: { plan_id: plan.id }}"></router-link>
                </div>
              </div>
            </div>
            <div v-else style="text-align:center">😂 暂无物品清单</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  const {JX3BOX} = require("@jx3box/jx3box-common");
  import {get_item_posts} from "../service/item.js";
  import {get_item_plans} from "../service/item_plan.js";

  export default {
    name: 'Home',
    props: [],
    data: function () {
      return {
        newest_posts: [],
        newest_plans: [],
        feedback: JX3BOX.feedback,
      }
    },
    methods: {
      img_error_handle(e) {
        e.target.src = `${JX3BOX.__imgPath}image/common/nullicon.png`;
      },
      ellipsis(value) {
        value = value ? value.trim() : "";
        if (value.length > 100) {
          return value.slice(0, 100) + "...";
        }
        return value;
      },
    },
    mounted: function () {
      get_item_posts().then((data) => {
        data = data.data;
        if (data.code === 200) {
          this.newest_posts = data.data.newest;
        }
      });

      get_item_plans().then((data) => {
        data = data.data;
        if (data.code === 200) {
          this.newest_plans = data.data.data;
        }
      });
    },
    components: {},
    filters: {
      resolveAvatarPath: function (val) {
        return val.replace(JX3BOX.__ossRoot, JX3BOX.__ossMirror);
      },
    },
  }
</script>

<style lang="less">
  @import '../assets/css/views/home.less';
</style>