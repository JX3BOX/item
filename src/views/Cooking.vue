<template>
    <div class="v-cooking">
        <!-- 头部 -->
        <div class="m-cooking-header"></div>

        <!-- 中央 -->
        <div class="m-cooking-main">
            <!-- 左侧边 -->
            <div class="m-cooking-side"></div>

            <!-- 内容 -->
            <div class="m-cooking-content"></div>

            <!-- 购物车 -->
            <div class="m-cooking-panel"></div>
        </div>

        <!-- 底部 -->
        <div class="m-cooking-footer"></div>
    </div>
</template>

<script>
export default {
    name: "Cooking",
    props: [],
    components: {},
    data: function() {
        return {};
    },
    computed: {},
    watch: {},
    methods: {},
    filters: {},
    created: function() {},
    mounted: function() {},
};
</script>

<style scoped lang="less">
@import "~@/assets/css/views/cooking.less";
</style>
