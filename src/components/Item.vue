<template>
    <div class="m-item" v-if="item">
        <div class="item-detail">
            <!-- 物品名称 -->
            <h4 class="u-title" :style="{color:$options.filters.item_color(item.Quality)}" v-text="item.Name"></h4>
            <!-- 绑定状态 -->
            <span v-if="item.BindType > 1" class="u-bind" v-text="$options.filters.item_bind(item.BindType)"></span>
            <!-- 唯一 -->
            <span v-if="parseInt(item.MaxExistAmount) === 1" class="unique" v-text="'唯一'"></span>
            <!-- 装备属性 -->
            <div class="m-attributes" v-if="item.attributes.length">
                <div v-for="(attribute,key) in item.attributes" :key="key" class="m-field">
                    <span class="u-value" :style="{color:attribute.color}" v-text="attribute.label"></span>
                </div>
            </div>
            <!-- 需要等级 -->
            <span v-if="parseInt(item.Require1Type) === 5" class="u-require-level" v-text="'需要等级' + item.Require1Value"></span>
            <!-- 最大耐久度 -->
            <span v-if="item.MaxDurability" class="u-max-durability" v-text="'最大耐久度' + item.MaxDurability"></span>
            <!-- 描述 -->
            <p v-if="item.DescHtml" class="u-desc" v-html="item.DescHtml"></p>
            <!-- 品质等级 -->
            <span v-if="item.Level" class="u-level" v-text="'品质等级' + item.Level"></span>
            <!-- 装备分数 -->
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
