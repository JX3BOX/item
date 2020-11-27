<template>
    <div
        class="m-search-bar"
        :class="$route.name == 'plan_view' ? 'can-return' : ''"
    >
        <div class="m-return">
            <el-button class="u-return-btn" @click="return_handle"
                >返回</el-button
            >
        </div>
        <div class="m-add">
            <el-button class="u-add-btn" @click="add_handle" type="primary" icon="el-icon-plus"
            >创建清单</el-button
            >
        </div>
        <div class="m-search">
            <el-input
                class="u-search-input"
                v-model="keyword"
                @keydown.enter.native="search_handle"
                placeholder="输入物品清单名称「回车」进行搜索"
            >
            <span slot="prepend">关键词</span>
            </el-input>
            <el-button
                class="u-search-btn"
                type="primary"
                plain
                @click="search_handle"
                >搜索</el-button
            >
        </div>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");

export default {
    name: "PlanSearch",
    data() {
        return {
            keyword: "",
        };
    },
    methods: {
        return_handle() {
            history.back();
        },
        add_handle() {
            location.href = `${JX3BOX.__Links.dashboard.publish}#/item/plan`;
        },
        search_handle() {
            this.$router.push({
                name: "plan_list",
                params: { keyword: this.keyword },
            });
        },
    },
};
</script>

<style lang="less">
    @import "../assets/css/components/search.less";
    .m-search {
        .mr(130px);
    }

    .m-add {
        .fr;
    }
</style>
