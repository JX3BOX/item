<template>
    <el-row class="m-items">
        <el-col :xs="24" :md="24" class="u-list-empty" v-if="!$_.get(items,'length')">👻 暂无记录</el-col>
        <ItemPanel v-for="(item, key) in items" :key="key" :item="item"/>
    </el-row>
</template>

<script>
    import ItemPanel from '@/components/ItemPanel.vue';

    export default {
        name: "Items",
        props: ['items'],
        components: {
            ItemPanel,
        }
    };
</script>

<style lang="less">
    @import '../assets/css/components/items.less';
</style>
