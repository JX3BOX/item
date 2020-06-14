<template>
    <ul class="m-items">
        <li class="u-list-empty" v-if="!$_.get(items,'length')">👻 暂无记录</li>
        <Item v-for="(item, key) in items" :key="key" :item="item"/>
    </ul>
</template>

<script>
    import Item from '@/components/Item.vue';

    export default {
        name: "Items",
        props: ['items'],
        components: {
            Item,
        }
    };
</script>

<style lang="less">
    @import '../assets/css/components/items.less';
</style>
