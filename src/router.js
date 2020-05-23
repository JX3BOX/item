import Vue from "vue";
import VueRouter from "vue-router";

// 组件懒加载
const Home = () => import("./views/Home.vue");

Vue.use(VueRouter);

const routes = [
    // 主页
    { name: 'home', path: '/home', component: Home },
    // 默认页重定向
    {path: '*', redirect: 'home'}
];

const router = new VueRouter({
    routes
});

export default router;
