import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

// 组件懒加载
const Home = () => import("./views/Home.vue");
const Normal = () => import("./views/Normal.vue");
const Detail = () => import("./views/Detail.vue");
const PlanDetail = () => import("./views/PlanDetail.vue");
const PlanList = () => import("./views/PlanList.vue");
// const Search = () => import("./views/Search.vue");

const routes = [
    // 主页
    { name: "home", path: "/home", component: Home },
    // 常规
    { name: "normal", path: "/:AucGenre([empty|\\d]+)/:AucSubTypeID(\\d+)", component: Normal },
    // 搜索
    { name: "search", path: "/search/:keyword(.+)?", component: Search },

    // 单页
    { name: "view", path: "/view/:item_id([_\\d]+)/:post_id(\\d+)?", component: Detail },

    // 清单单页
    { name: "plan_view", path: "/plan_view/:plan_id(\\d+)", component: PlanDetail },
    // 清单列表
    { name: "plan_list", path: "/plan_list/:keyword(.+)?", component: PlanList },
    
    // 默认页重定向
    { path: "*", redirect: "home" },
];

const router = new VueRouter({
    routes,
});

export default router;
