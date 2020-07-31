<template>
    <div class="m-breadcrumb">
        <div class="u-stat">
            <span><em>物品总数</em><b v-text="count.total"></b></span>
            <span><em>破败物品数</em><b v-text="count.quality_0"></b></span>
            <span><em>普通物品数</em><b v-text="count.quality_1"></b></span>
            <span><em>精巧物品数</em><b v-text="count.quality_2"></b></span>
            <span><em>卓越物品数</em><b v-text="count.quality_3"></b></span>
            <span><em>珍奇物品数</em><b v-text="count.quality_4"></b></span>
            <span><em>稀世物品数</em><b v-text="count.quality_5"></b></span>
            <span><em>收录攻略数</em><b v-text="count.posts_total"></b></span>
        </div>
    </div>
</template>
<script>
    import {get_items_count} from "../service/item.js";

    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: "ItemBreadcrumb",
        props: [],
        data: function () {
            return {
                count: {},
            };
        },
        computed: {},
        methods: {},
        mounted: function () {
            // 输出物品总数统计
            get_items_count().then((res) => {
                res = res.data;
                if (res.code === 200) this.count = res.data;
            });
        },
    };
</script>

<style lang="less">
    @import '../assets/css/components/bread.less';
</style>
