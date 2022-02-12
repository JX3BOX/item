<template>
    <el-popover
        v-if="source"
        placement="right-start"
        width="auto"
        :trigger="click_trigger ? 'click' : 'hover'"
        :disabled="dishoverable"
        popper-class="m-item-icon-popup"
        :visible-arrow="false"
        transition="none"
        :close-delay="0"
        @show="show"
    >
        <div slot="reference" class="m-item-icon">
            <div
                class="u-border"
                :style="{
                    backgroundImage: item_border(source),
                    opacity: source.Quality == 5 ? 0.9 : 1,
                }"
            ></div>
            <div
                class="u-border-quest"
                :style="{
                    backgroundImage: item_border_quest(source),
                }"
            ></div>
            <img
                class="u-item-icon"
                :src="icon_url(source.IconID)"
            />
        </div>
        <jx3-item :item="source" />
    </el-popover>
</template>

<script>
import Item from "@jx3box/jx3box-editor/src/Item";
import { get_item } from "../service/item.js";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { icon_url } from "../filters/index.js";

export default {
    name: "ItemIcon",
    props: ["item", "item_id", "dishoverable", "click_trigger"],
    data() {
        return {
            source: null,
        };
    },
    components: {
        "jx3-item": Item,
    },
    methods: {
        get_data(item_id) {
            if (item_id) {
                get_item(item_id).then((res) => {
                    let data = res.data;
                    let item = data.data.item;
                    if (Object.keys(item).length) this.source = item;
                });
            }
        },
        show() {
            if (!this.source || typeof this.source.Genre === "undefined") {
                this.get_data(this.source.id);
            }
        },
        item_border(item) {
            switch (item.Quality) {
                case 3:
                    return `url(${__imgPath}image/item/blue.png)`;
                case 4:
                    return `url(${__imgPath}image/item/purple.png)`;
                case 5:
                    return `url(${__imgPath}image/item/orange.gif)`;
                default:
                    return "";
            }
        },
        item_border_quest(item) {
            if (item.IsQuest > 0)
                return `url(${__imgPath}image/item/renwu.png)`;
            return "";
        },
        icon_url
    },
    watch: {
        item: {
            immediate: true,
            handler() {
                this.source = this.item;
            },
        },
        item_id: {
            immediate: true,
            handler() {
                this.get_data(this.item_id);
            },
        },
    },
};
</script>

<style lang="less">
.m-item-icon-popup {
    min-width: initial;
    padding: 0;
    border: none;
    box-shadow: none;
    background-color: transparent;
    transform: translateY(-10px);
}
</style>
<style lang="less" scoped>
@import "../assets/css/components/item_icon.less";
</style>
