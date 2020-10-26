<template>
  <el-row class="m-items">
    <el-col :xs="24" :md="24" class="u-list-empty" v-if="!$_.get(items,'length')">👻 暂无记录</el-col>
    <template v-for="(item, key) in items">
      <el-col v-if="JSON.stringify(item) !== '{}'" :key="key" :xs="24" :md="24" class="m-item-container">
        <router-link class="m-link" :target="target_filter()" :to="url_filter(item.id)">
          <div class="m-left">
            <img class="u-icon" :src="$options.filters.icon_url(item.IconID)">
          </div>
          <div class="m-right">
            <h6 class="u-name" :class="{white:item.Quality==1}" v-text="item.Name"
                :style="{color:$options.filters.item_color(item.Quality)}"></h6>
            <div class="u-description" v-html="item.DescHtml"></div>
          </div>
        </router-link>
      </el-col>
    </template>
  </el-row>
</template>

<script>
export default {
  name: "Items",
  props: ['items'],
  methods: {
    url_filter: function (item_id) {
      return this.jump === true || typeof this.jump === "undefined"
          ? {name: "view", params: {item_id: item_id}}
          : {};
    },
    target_filter: function () {
      return this.target || typeof this.target !== "undefined"
          ? this.target
          : "";
    },
  },
  components: {
  }
};
</script>

<style lang="less">
@import '../assets/css/components/items.less';
</style>
