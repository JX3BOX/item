<template>
    <div id="app">
        <Header></Header>
        <!-- 频道栏 -->
        <Breadcrumb name="频道名称" slug="slug" root="/slug" publishEnable="true">
            <img slot="logo" svg-inline src="./assets/img/logo.svg" />
            <Info />
        </Breadcrumb>
        <!-- 左侧菜单 -->
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
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
import Info from '@/components/Info.vue';
import Nav from '@/components/Nav.vue';
import Extend from '@/components/Extend.vue';

    export default {
        name : 'App',
        props:[],
        data : function(){
            return {
                
            }
        },
        computed:{},
        methods:{},
        mounted:function(){},
        components:{
            Info,
            Nav,
            Extend,
        }
    }
</script>