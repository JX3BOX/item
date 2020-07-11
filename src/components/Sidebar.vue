<template>
    <div class="m-cj-aside-left">
        <div class="m-menus">
            <el-tree
                class="filter-tree"
                :data="menus"
                node-key="id"
                ref="tree"
                @node-click="clickNode"
            >
                <router-link
                    class="el-tree-node__label"
                    slot-scope="{ node, data }"
                    :to="menu_url(data, node)"
                >
                    <span class="u-name" v-text="data.label"></span>
                    <em
                        v-if="data.items_total"
                        class="u-count"
                        v-text="`(${data.items_total})`"
                    ></em>
                </router-link>
            </el-tree>
        </div>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
import Bus from "@jx3box/jx3box-common-ui/service/bus";
export default {
    name: "Sidebar",
    props: ["sidebar"],
    data: function() {
        return {
            menus: null,
        };
    },
    watch: {
        sidebar: {
            immediate: true,
            deep: true,
            handler() {
                // 展开菜单
                this.expand_menu();

                // 异步加载侧边栏数据
                this.get_menus();
            },
        },
    },
    methods: {
        get_menus() {
            this.$http({
                method: "GET",
                url: `${JX3BOX.__helperUrl}api/item/menus`,
                headers: { Accept: "application/prs.helper.v2+json" },
                withCredentials: true,
            }).then(
                (data) => {
                    data = data.data;
                    if (data.code === 200) {
                        let menus = [];
                        // 生成ID用于菜单激活
                        for (let index in data.data.menus) {
                            data.data.menus[index].id =
                                data.data.menus[index].AucGenre;
                            for (let i in data.data.menus[index].children) {
                                data.data.menus[index].children[
                                    i
                                ].id = `${data.data.menus[index].AucGenre}-${data.data.menus[index].children[i].AucSubTypeID}`;
                            }
                            menus.push(data.data.menus[index]);
                        }
                        this.menus = menus;

                        // 展开菜单
                        this.expand_menu();
                    }
                },
                () => {
                    this.menus = false;
                }
            );
        },
        expand_menu() {
            this.$nextTick(() => {
                let AucGenre = this.sidebar.AucGenre;
                let AucSubTypeID = this.sidebar.AucSubTypeID;
                let key = AucGenre + (AucSubTypeID ? `-${AucSubTypeID}` : "");

                if (key) {
                    let node = this.$refs.tree.store.getNode(key);
                    if (node) {
                        node.expanded = true;
                        if (node.parent) node.parent.expanded = true;
                        this.$refs.tree.store.setCurrentNode(node);
                    }
                }
            });
        },
        menu_url(data, node) {
            let AucGenre = this.$_.get(node.parent, "data.AucGenre", null);
            // 父级菜单不请求
            if (AucGenre === null) return {};
            let params = {
                AucGenre: AucGenre === "" ? "empty" : AucGenre,
                AucSubTypeID:
                    data.AucSubTypeID === "" ? "empty" : data.AucSubTypeID,
            };
            return { name: "normal", params: params };
        },
        clickNode(data, node) {
            // 移动端收起边栏
            if (window.innerWidth < 1024) {
                if (node.isLeaf) {
                    Bus.$emit("toggleLeftSide", false);
                }
            }
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/components/sidebar.less";
</style>
