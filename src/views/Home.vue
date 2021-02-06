<template>
  <div class="m-home-view">
    <Search />

    <WikiPanel border-none="true">
      <template slot="head-title">
        <i class="el-icon-location-information"></i>
        <span>便捷入口</span>
      </template>
      <template slot="head-actions">
        <a class="u-more" target="_blank" :href="feedback">反馈建议 &raquo;</a>
      </template>
      <template slot="body">
        <ul class="m-qlinks">
          <li class="qlink">
            <a
              style="background-color:#FE7979;"
              target="_blank"
              href="https://www.jx3box.com/tool/18151/"
            >
              <i class="el-icon-trophy"></i>
              <span>游戏内看百科</span>
            </a>
          </li>
          <li class="qlink">
            <router-link :to="{ name: 'plan_list' }">
              <i class="el-icon-document"></i>
              物品清单
            </router-link>
          </li>
          <li class="qlink">
            <router-link
              :to="{name: 'search', query: {ids: '5_24423,5_24424,5_24425,5_24426,5_24427,5_24428,5_24429,5_24430'}}"
            >
              <i class="el-icon-edit-outline"></i>
              <span>五行石合成</span>
            </router-link>
          </li>
          <li class="qlink">
            <a style="cursor:not-allowed;background-color:#CCCCCC;">
              <i class="el-icon-lollipop"></i>
              <span>宠物图鉴</span>
            </a>
          </li>
        </ul>
      </template>
    </WikiPanel>

    <WikiPanel border-none="true">
      <template slot="head-title">
        <i class="el-icon-notebook-1"></i>
        <span>最新物品清单</span>
      </template>
      <template slot="head-actions">
        <router-link :to="{ name: 'plan_list' }" class="u-more">查看更多 &raquo;</router-link>
      </template>
      <template slot="body">
        <div class="m-plan-list">
          <el-carousel
            height="66px"
            direction="vertical"
            indicator-position="none"
            v-if="newest_plans && newest_plans.length"
          >
            <el-carousel-item v-for="(items, key) in newest_plans" :key="key" class="m-carousel">
              <el-row :gutter="20">
                <template v-for="(item, k) in items">
                  <el-col :md="8" v-if="item" :key="k">
                    <router-link
                      class="u-item"
                      :class="`u-item-${k}`"
                      :to="'/plan_view/' + item.id"
                    >
                      <div class="u-icon">
                        <span v-if="item.type == 1" class="u-type" :class="'u-type-' + item.type">
                          <img :src="plan_1_icon" />
                        </span>
                        <span v-if="item.type == 2" class="u-type" :class="'u-type-' + item.type">
                          <img :src="plan_2_icon" />
                        </span>
                      </div>
                      <div class="m-carousel-content">
                        <span class="u-title">
                          <i class="el-icon-tickets"></i> 
                          <span v-text="item.title"></span>
                        </span>
                        <span class="u-desc" v-if="item.description">
                          <i class="el-icon-mic"></i>
                          <span v-html="item.description"></span>
                        </span>
                      </div>
                    </router-link>
                  </el-col>
                </template>
              </el-row>
            </el-carousel-item>
          </el-carousel>
          <div v-else style="text-align:center">😂 暂无物品清单</div>
        </div>
      </template>
    </WikiPanel>

    <WikiPanel border-none="true">
      <template slot="head-title">
        <i class="el-icon-collection"></i>
        <span>最新攻略</span>
      </template>
      <template slot="body">
        <div class="wiki-post-list" v-if="newest_posts.length">
          <div class="wiki-post" v-for="(post, key) in newest_posts" :key="key">
            <div class="m-about-post">
              <div class="m-user">
                <div class="u-author">
                  <img
                    class="u-icon"
                    :src="post.user_avatar | resolveAvatarPath"
                    :alt="post.user_nickname"
                  />
                  <a :href="post.user_id | author_url" class="u-name" v-text="post.user_nickname"></a>
                </div>
                <div class="u-updated" v-text="$options.filters.date_format(post.updated)"></div>
              </div>
              <div class="m-wiki">
                <div class="u-wiki">
                  <img
                    class="u-icon"
                    :src="$options.filters.icon_url(post.source_icon_id)"
                    @error.once="$event.target.src = icon_url()"
                  />
                  <router-link
                    class="u-name"
                    v-text="post.title"
                    :to="{name: 'view', params: {item_id: post.source_id}}"
                  ></router-link>
                </div>
                <div class="u-level" v-text="'综合难度：' + $options.filters.star(post.level)"></div>
                <div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
              </div>
            </div>
            <div class="m-excerpt">
              <router-link
                class="u-excerpt"
                v-html="ellipsis(post.excerpt)"
                :to="{
                                    name: 'view',
                                    params: { item_id: post.source_id },
                                }"
              ></router-link>
            </div>
          </div>
        </div>
        <div v-else style="text-align:center">😂 暂无攻略</div>
      </template>
    </WikiPanel>
  </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
import Search from "../components/Search.vue";
import { iconLink, resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import { get_item_posts } from "../service/item.js";
import { get_item_plans } from "../service/item_plan.js";

export default {
  name: "Home",
  data() {
    return {
      newest_posts: [],
      newest_plans: [],
      feedback: JX3BOX.feedback,
      plan_2_icon: JX3BOX.__iconPath + "icon/2410.png",
      plan_1_icon: JX3BOX.__iconPath + "icon/3089.png",
    };
  },
  components: {
    Search,
    WikiPanel,
  },
  methods: {
    icon_url: iconLink,
    ellipsis(value) {
      value = value ? value.trim() : "";
      if (value.length > 100) {
        return value.slice(0, 100) + "...";
      }
      return value;
    },
    chuck(arr, number = 3) {
      let output = [];
      for (let i = 0; i < arr.length; i += number) {
        output.push(arr.slice(i, i + number));
      }
      return output;
    },
  },
  created() {
    get_item_posts().then((res) => {
      res = res.data;
      if (res.code === 200) this.newest_posts = res.data.newest;
    });

    get_item_plans({ limit: 15 }).then((res) => {
      res = res.data;
      if (res.code === 200)
        this.newest_plans = this.chuck(Object.values(res.data.data));
    });
  },
  filters: {
    resolveAvatarPath(val) {
      return resolveImagePath(val);
    },
  },
};
</script>

<style lang="less">
@import "../assets/css/views/home.less";
</style>
