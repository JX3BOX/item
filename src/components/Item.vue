<template>
  <div class="m-item" v-if="item">
    <div class="item-detail">
      <!-- 物品名称 -->
      <h4 class="u-title" :style="{color:$options.filters.item_color(item.Quality)}" v-text="item.Name"></h4>
      <!-- 绑定状态 -->
      <div v-if="item.BindType > 1" class="u-bind" v-text="$options.filters.item_bind(item.BindType)"></div>
      <!-- 唯一 -->
      <div v-if="parseInt(item.MaxExistAmount) === 1" class="unique" v-text="'唯一'"></div>
      <!-- 装备属性 -->
      <div class="m-attributes" v-if="item.attributes.length">
        <div v-for="(attribute,key) in item.attributes" :key="key" class="m-field">
          <span v-if="attribute.type=='atMeleeWeaponAttackSpeedBase'" class="u-value u-speed"
                :style="{color:attribute.color}" v-text="attribute.label"></span>
          <span v-else class="u-value" :style="{color:attribute.color}" v-text="attribute.label"></span>
        </div>
      </div>
      <ul v-if="item.Diamonds" class="m-diamonds">
        <li class="m-diamond" v-for="(label,key) in item.Diamonds" :key="key">
          <span class="u-square"></span>
          <span class="u-text" v-text="`镶嵌孔：${label}`"></span>
        </li>
      </ul>
      <!-- 仅性别可穿戴 -->
      <div v-if="item.Requires&&item.Requires[7]" class="u-require-sex" v-text="item.Requires[7]"></div>
      <!-- 需要门派 -->
      <div v-if="item.Requires&&item.Requires[6]" class="u-require-school" v-text="item.Requires[6]"></div>
      <!-- 需要等级 -->
      <div v-if="item.Requires&&item.Requires[5]" class="u-require-level" v-text="item.Requires[5]"></div>
      <!-- 最大耐久度 -->
      <div v-if="item.MaxDurability" class="u-max-durability" v-text="'最大耐久度' + item.MaxDurability"></div>
      <!-- 描述 -->
      <p v-if="item.DescHtml" class="u-desc" v-html="item.DescHtml"></p>
      <!-- 品质等级 -->
      <div v-if="item.Level" class="u-level" v-text="'品质等级' + item.Level"></div>
      <!-- 装备分数 -->
      <div v-if="item.EquipmentRating" class="u-equipment-rating" v-text="'装备分数' + item.EquipmentRating"></div>
    </div>
  </div>
</template>

<script>
import {get_item} from "../service/item.js";

const {JX3BOX} = require("@jx3box/jx3box-common");

export default {
  name: "Item",
  props: ['item_id'],
  data: function () {
    return {
      item: null
    }
  },
  methods: {},
  mounted() {
    get_item(this.item_id).then((res) => {
      let data = res.data;
      if (data.code === 200) {
        let item = data.data.item;
        if (JSON.stringify(item) !== '{}') this.item = item;
      }
    });
  },
  components: {}
};
</script>

<style lang="less" scoped>
@import '../assets/css/components/item.less';
</style>
