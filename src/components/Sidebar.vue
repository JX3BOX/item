<template>
    <div class="m-cj-aside-left">
        <div class="m-menus">
            <el-tree
                    class="filter-tree"
                    :data="menus"
                    node-key="id"
                    ref="tree"
            >
                <router-link class="el-tree-node__label" slot-scope="{ node, data }" :to="menu_url(data,node)">
                    <span class="u-name" v-text="data.label"></span>
                    <em v-if="data.items_total" class="u-count" v-text="`(${data.items_total})`"></em>
                </router-link>
            </el-tree>
        </div>
    </div>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: "Sidebar",
        props: [],
        data: function () {
            return {
                menus: null,
            };
        },
        watch: {},
        methods: {
            get_menus() {
                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/item/menus`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    withCredentials: true
                }).then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        let menus = [];
                        // 生成ID用于菜单激活
                        for (let index in data.data.menus) {
                            data.data.menus[index].id = data.data.menus[index].AucGenre;
                            for (let i in data.data.menus[index].children) {
                                data.data.menus[index].children[i].id = `${data.data.menus[index].AucGenre}-${data.data.menus[index].children[i].AucSubType}`
                            }
                            menus.push(data.data.menus[index]);
                        }
                        this.menus = menus;

                        this.$nextTick(() => {
                            let AucGenre = this.$store.state.sidebar.AucGenre;
                            let AucSubType = this.$store.state.sidebar.AucSubType;
                            let key = AucGenre + (AucSubType ? `-${AucSubType}` : '');

                            if (key) {
                                let node = this.$refs.tree.store.getNode(key);
                                if (node) {
                                    node.expanded = true;
                                    if (node.parent) node.parent.expanded = true;
                                    this.$refs.tree.store.setCurrentNode(node);
                                }
                            }
                        });
                    }
                }, () => {
                    this.menus = false;
                });
            },
            menu_url(data, node) {
                let AucGenre = this.$_.get(node.parent, 'data.AucGenre', null);
                // 父级菜单不请求
                if (AucGenre === null) return {};
                let params = {
                    AucGenre: AucGenre === '' ? 'empty' : AucGenre,
                    AucSubType: data.AucSubType === '' ? 'empty' : data.AucSubType,
                };
                return {name: 'normal', params: params};
            },
        },
        mounted() {
            this.get_menus();
        },
    };
</script>

<style lang="less">
    @import '../assets/css/components/sidebar.less';
</style>
