<template>
    <div id="app">
        <Header></Header>
        <!-- 频道栏 -->
        <Breadcrumb
            name="物品百科"
            slug="item"
            root="/item"
            :publishEnable="true"
            :feedbackEnable="true"
            :adminEnable="false"
        >
            <img slot="logo" svg-inline :src="getAppIcon('item')" />
            <ItemBreadcrumb />
        </Breadcrumb>
        <!-- 左侧菜单 -->
        <LeftSidebar>
            <Sidebar :sidebar="$store.state.sidebar" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <!-- 路由页面内容 -->
            <router-view />
            <!-- 右侧咨询 -->
            <RightSidebar>
                <Extend />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import ItemBreadcrumb from "@/components/ItemBreadcrumb.vue";
import Sidebar from "@/components/Sidebar.vue";
import Extend from "@/components/Extend.vue";
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods : {
        getAppIcon
    },
    mounted: function () {},
    components: {
        ItemBreadcrumb,
        Sidebar,
        Extend,
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                if (
                    typeof this.$route.params.AucGenre === "undefined" &&
                    typeof this.$route.params.AucSubTypeID === "undefined" &&
                    typeof this.$route.query.auc_genre === "undefined" &&
                    typeof this.$route.query.auc_sub_type_id === "undefined" &&
                    !this.$route.params.item_id
                ) {
                    this.$store.state.sidebar.AucGenre = null;
                    this.$store.state.sidebar.AucSubTypeID = null;
                } else {
                    this.$store.state.sidebar.AucGenre = this.$route.query
                        .auc_genre
                        ? this.$route.query.auc_genre
                        : "";
                    this.$store.state.sidebar.AucSubTypeID = this.$route.query
                        .auc_sub_type_id
                        ? this.$route.query.auc_sub_type_id
                        : "";
                    // 如存在路由参数，优先使用路由参数
                    if (this.$route.params.AucGenre) {
                        this.$store.state.sidebar.AucGenre =
                            this.$route.params.AucGenre === "empty"
                                ? ""
                                : this.$route.params.AucGenre;
                        this.$store.state.sidebar.AucSubTypeID = this.$route
                            .params.AucSubTypeID
                            ? this.$route.params.AucSubTypeID
                            : "";
                    }
                }
            },
        },
    },
};
</script>