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
                    <em v-if="false" class="u-count" v-text="`(0)`"></em>
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
                        for (let i in data.data.menus) menus.push(data.data.menus[i]);
                        this.menus = menus;
                    }
                }, () => {
                    this.menus = false;
                });
            },
            menu_url(data, node) {
                let Genre = this.$_.get(node.parent, 'data.Genre', null);
                if (Genre === null || typeof data.SubType === 'undefined') return {};
                let params = {
                    Genre: Genre === '' ? 'empty' : Genre,
                    SubType: data.SubType === '' ? 'empty' : data.SubType,
                };
                if (typeof data.DetailType !== 'undefined') params.DetailType = data.DetailType === '' ? 'empty' : data.DetailType;
                return {name: 'normal', params: params};
            },
        },
        mounted() {
            this.get_menus();
        },
    };
</script>

<style lang="less">

</style>
