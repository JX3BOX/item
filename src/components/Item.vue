<template>
    <div class="m-item" v-if="item">
        <span class="none"
              :data-require_level="(item.RequireLevel = parseInt(item.Require1Type) === 5 ? item.Require1Value : '')"
        ></span>
        <img class="item-icon" :src="$options.filters.icon_url(item.IconID)" :alt="item.Name"/>
        <div class="item-detail">
            <h4 class="title" :style="{color:$options.filters.item_color(item.Quality)}" v-text="item.Name"></h4>
            <span v-if="item.BindType && item.BindType!==1" class="bind"
                  v-text="$options.filters.item_bind(item.BindType)"></span>
            <span v-if="parseInt(item.MaxExistAmount) === 1" class="unique" v-text="'唯一'"></span>
            <span v-if="item.RequireLevel" class="unique" v-text="'需要等级' + item.RequireLevel"></span>
            <p v-if="item.DescHtml" class="desc" v-html="item.DescHtml"></p>
            <span v-if="item.Level" class="level" v-text="'品质等级' + item.Level"></span>
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
