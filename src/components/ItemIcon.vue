<template>
  <el-popover v-if="source" placement="bottom-start" width="auto" :trigger="click_trigger?'click':'hover'"
              :disabled="dishoverable" @show="show">
    <div slot="reference" class="m-item-icon">
      <div class="u-border"
           :style="{backgroundImage:$options.filters.item_border(source),'opacity':item.Quality==5?0.9:1}"></div>
      <div class="u-border-quest" :style="{backgroundImage:$options.filters.item_border_quest(source)}"></div>
      <img class="u-item-icon" :src="$options.filters.icon_url(source.IconID)">
    </div>
    <Item :item="source" style="margin:-13px"/>
  </el-popover>
</template>

<script>
import Item from "@/components/Item.vue";
import {get_item} from "../service/item.js";

const {JX3BOX} = require("@jx3box/jx3box-common");

export default {
  name: "ItemIcon",
  props: ['item', 'item_id', 'dishoverable', 'click_trigger'],
  data() {
    return {
      source: null,
    };
  },
  components: {
    Item
  },
  methods: {
    get_data(item_id) {
      if (item_id) {
        get_item(item_id).then((res) => {
          let data = res.data;
          if (data.code === 200) {
            let item = data.data.item;
            if (JSON.stringify(item) !== '{}') this.source = item;
          }
        });
      }
    },
    show() {
      if (!this.source || typeof this.source.Genre === 'undefined') {
        this.get_data(this.source.id);
      }
    },
  },
  watch: {
    'item': {
      immediate: true,
      handler() {
        this.source = this.item;
      }
    },
    'item_id': {
      immediate: true,
      handler() {
        this.get_data(this.item_id);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import '../assets/css/components/item_icon.less';
</style>
