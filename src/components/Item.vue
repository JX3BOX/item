<template>
    <li class="m-item" v-if="JSON.stringify(item) !== '{}'">
        <img class="u-icon" :src="$options.filters.icon_url(item.IconID)"
             :title="$options.filters.description(item.Desc)">
        <h6 class="u-name" :class="{white:item.Quality==1}" v-text="item.Name"
            :style="{color:$options.filters.item_color(item.Quality)}"></h6>
    </li>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: "Item",
        props: ['item'],
        data: function () {
            return {}
        },
        methods: {},
        mounted() {
        },
        components: {}
    };
</script>

<style lang="less">
    @import '../assets/css/components/item.less';
</style>
