<template>
  <div class="m-item-index m-item-home">
    <div class="m-module no-border">
      <div class="u-head">
        <a class="other" target="_blank" :href="feedback">反馈建议 &raquo;</a>
        <h4>
          <i class="el-icon-location-information"></i>
          <span> 便捷入口</span>
        </h4>
      </div>
      <div class="u-body">
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

    <div class="m-module">
      <div class="u-head" style="background-color:#666666;border-bottom:none">
        <h4 style="color:#FFFFFF">神兵图鉴</h4>
      </div>
      <div class="u-body" style="background-color:#032222;font-size:0">
        <ItemIcon v-for="(item,key) in icon_items" :key="key" :item="item" :click_trigger="true"
                  style="cursor: pointer"/>
      </div>
    </div>

    <div class="m-module">
      <div class="u-head">
        <h4>最近攻略</h4>
      </div>
      <div class="u-body">
        <el-row class="wiki-post-list" v-if="newest_posts.length">
          <el-col class="wiki-post" v-for="(post, key) in newest_posts" :key="key">
            <div class="m-head">
              <div class="m-user">
                <div class="u-author">
                  <img class="u-icon" :src="post.user_avatar | resolveAvatarPath"
                       :alt="post.user_nickname"/>
                  <span class="u-name" v-text="post.user_nickname"></span>
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
            <div class="m-body">
                            <span class="u-excerpt" :to="{name: 'view',params: { item_id: post.source_id }}"
                                  v-html="ellipsis(post.excerpt)"></span>
            </div>
          </el-col>
        </el-row>
        <el-row v-else style="text-align:center">😂 暂无攻略</el-row>
      </div>
    </div>
  </div>
</template>

<script>
const {JX3BOX} = require("@jx3box/jx3box-common");
import {get_home_icons, get_item_posts} from "../service/item.js";
import ItemIcon from "@/components/ItemIcon.vue";

export default {
  name: 'Home',
  props: [],
  data: function () {
    return {
      icon_items: [],
      newest_posts: [],
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
    get_home_icons().then((res) => {
      res = res.data;
      if (res.code === 200) this.icon_items = res.data.data;
    });

    get_item_posts().then((data) => {
      data = data.data;
      if (data.code === 200) {
        this.newest_posts = data.data.newest;
      }
    });
  },
  components: {
    ItemIcon,
  },
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