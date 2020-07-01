<template>
    <div id="app">
        <Header></Header>
        <!-- 频道栏 -->
        <Breadcrumb name="物品百科" slug="slug" root="/slug" publishEnable="true" feedbackEnable="true">
            <img slot="logo" svg-inline src="./assets/img/logo.svg"/>
        </Breadcrumb>
        <!-- 左侧菜单 -->
        <LeftSidebar>
            <Sidebar :sidebar="$store.state.sidebar" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <Search/>
            <!-- 路由页面内容 -->
            <router-view/>
            <!-- 右侧咨询 -->
            <RightSidebar>
                <Extend/>
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
    import Sidebar from '@/components/Sidebar.vue';
    import Search from '@/components/Search.vue';
    import Extend from '@/components/Extend.vue';

    export default {
        name: 'App',
        props: [],
        data: function () {
            return {}
        },
        computed: {},
        methods: {},
        mounted: function () {
        },
        components: {
            Sidebar,
            Search,
            Extend,
        },
        watch: {
            $route: {
                immediate: true,
                handler() {
                    if (
                        typeof this.$route.params.AucGenre === 'undefined' &&
                        typeof this.$route.params.AucSubTypeID === 'undefined' &&
                        !this.$route.params.item_id
                    ) {
                        this.$store.state.sidebar.AucGenre = null;
                        this.$store.state.sidebar.AucSubTypeID = null;
                    } else {
                        if (typeof this.$route.params.AucGenre !== 'undefined')
                            this.$store.state.sidebar.AucGenre = this.$route.params.AucGenre === 'empty' ? '' : this.$route.params.AucGenre;
                        if (typeof this.$route.params.AucSubTypeID !== 'undefined')
                            this.$store.state.sidebar.AucSubTypeID = this.$route.params.AucSubTypeID ? this.$route.params.AucSubTypeID : '';
                    }
                }
            },
        }
    }
</script>