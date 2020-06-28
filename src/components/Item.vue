<template>
    <li class="m-item" v-if="JSON.stringify(item) !== '{}'">
        <router-link :target="target_filter()" :to="url_filter(item.UiID)">
            <img class="u-icon" :src="$options.filters.icon_url(item.IconID)"
                 :title="$options.filters.description(item.Desc)">
            <h6 class="u-name" :class="{white:item.Quality==1}" v-text="item.Name"
                :style="{color:$options.filters.item_color(item.Quality)}"></h6>
        </router-link>
    </li>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: "Item",
        props: ['item', "target", 'jump'],
        data: function () {
            return {}
        },
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
        mounted() {
        },
        components: {}
    };
</script>

<style lang="less">
    @import '../assets/css/components/item.less';
</style>
