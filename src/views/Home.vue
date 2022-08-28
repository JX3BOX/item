<template>
    <div class="m-home-view">
        <Search />

        <WikiPanel border-none="true">
            <template slot="head-title">
                <i class="el-icon-location-information"></i>
                <span>便捷入口</span>
            </template>
            <template slot="head-actions">
                <a class="u-more" target="_blank" :href="feedback">反馈建议 &raquo;</a>
            </template>
            <template slot="body">
                <ul class="m-qlinks">
                    <li class="qlink">
                        <a style="background-color: #fe7979" target="_blank" href="/tool/18151/">
                            <i class="el-icon-trophy"></i>
                            <span>游戏内看百科</span>
                        </a>
                    </li>
                    <li class="qlink">
                        <router-link :to="{ name: 'plan_list' }">
                            <i class="el-icon-document"></i>
                            物品清单
                        </router-link>
                    </li>
                    <li class="qlink">
                        <router-link :to="{
                            name: 'search',
                            query: {
                                ids: '5_24423,5_24424,5_24425,5_24426,5_24427,5_24428,5_24429,5_24430',
                            },
                        }">
                            <i class="el-icon-cherry"></i>
                            <span>五行石合成</span>
                        </router-link>
                    </li>
                    <li class="qlink">
                        <a target="_blank" href="/pvx/manufacture">
                            <i class="el-icon-magic-stick"></i>
                            <span>技艺助手</span>
                        </a>
                    </li>
                    <li class="qlink">
                        <a target="_blank" href="/app/price">
                            <i class="el-icon-orange"></i>
                            <span>金价走势</span>
                        </a>
                    </li>
                    <li class="qlink">
                        <a target="_blank" href="/pvg/item_price">
                            <i class="el-icon-orange"></i>
                            <span>物价大全</span>
                        </a>
                    </li>
                </ul>
            </template>
        </WikiPanel>

        <WikiPanel border-none="true">
            <template slot="head-title">
                <i class="el-icon-notebook-1"></i>
                <span>最新物价</span>
            </template>
            <template slot="head-actions">
                <a href="pvg/item_price" target="_blank" class="u-more">查看更多 &raquo;</a>
            </template>
            <template slot="body">
                <div class="m-plan-list">
                    <el-carousel height="120px" direction="vertical" indicator-position="none"
                        v-if="new_plans && new_plans.length">
                        <el-carousel-item v-for="(items, key) in new_plans" :key="key" class="m-carousel">
                            <el-row :gutter="20">
                                <template v-for="(item, k) in items">
                                    <el-col :md="8" v-if="item" :key="k">
                                        <router-link class="u-item" :class="`u-item-${k}`" :to="'/view/' + item.id">
                                            <div class="u-icon">
                                                <img :src="icon_url(item.icon)" />
                                            </div>
                                            <div class="u-content">
                                                <span class="u-name">
                                                    <span v-text="item.label"></span>
                                                </span>
                                                <span class="u-price">

                                                    <span v-if="item.sub_days_0_price">
                                                        <span>今日：</span>
                                                        <span class="u-trending" :class="showItemTrendingClass(item)">{{
                                                                showItemTrending(item)
                                                        }}</span>
                                                        <GamePrice :price="item.sub_days_0_price" />
                                                    </span>
                                                    <span v-if="item.sub_days_1_price">
                                                        <span>昨日：</span>
                                                        <GamePrice :price="item.sub_days_1_price" />
                                                    </span>
                                                    <span v-if="item.sub_days_2_price">
                                                        <span>前日：</span>
                                                        <GamePrice :price="item.sub_days_2_price" />
                                                    </span>
                                                    <span v-else>暂无价目</span>
                                                </span>
                                            </div>
                                        </router-link>
                                    </el-col>
                                </template>
                            </el-row>
                        </el-carousel-item>
                    </el-carousel>
                    <div v-else style="text-align:center">😂 暂无物品清单</div>
                </div>
            </template>
        </WikiPanel>

        <WikiPanel border-none="true">
            <template slot="head-title">
                <i class="el-icon-notebook-1"></i>
                <span>最热物品</span>
            </template>
            <template slot="head-actions">
                <router-link :to="{ name: 'plan_list' }" class="u-more">查看更多 &raquo;</router-link>
            </template>
            <template slot="body">
                <div class="m-plan-list">
                    <el-carousel height="86px" direction="vertical" indicator-position="none"
                        v-if="hot_plans && hot_plans.length">
                        <el-carousel-item v-for="(items, key) in hot_plans" :key="key" class="m-carousel m-carousel-hot">
                            <el-row :gutter="20">
                                <template v-for="(item, k) in items">
                                    <el-col :md="8" v-if="item" :key="k">
                                        <router-link class="u-item" :class="`u-item-${k}`" :to="'/view/' + item.id">
                                            <div class="u-icon">
                                                <img :src="icon_url(item.IconID)" />
                                            </div>
                                            <div class="u-content">
                                                <span class="u-name">
                                                    <span v-text="item.Name"></span>
                                                </span>
                                                <span class="u-desc" v-html="description_filter(item.Desc)">
                                                    <!-- <span v-if="item.log.price">
                                                        <span>平均价格：</span>
                                                        <GamePrice :price="item.log.price" />
                                                    </span>
                                                    <span v-if="item.log.max_price">
                                                        <span>最高：</span>
                                                        <GamePrice :price="item.log.max_price" />
                                                    </span>
                                                    <span v-if="item.log.min_price">
                                                        <span>最低：</span>
                                                        <GamePrice :price="item.log.min_price" />
                                                    </span>
                                                    <span v-else>暂无价目</span> -->
                                                </span>
                                            </div>
                                        </router-link>
                                    </el-col>
                                </template>
                            </el-row>
                        </el-carousel-item>
                    </el-carousel>
                    <div v-else style="text-align:center">😂 暂无物品清单</div>
                </div>
            </template>
        </WikiPanel>

        <WikiPanel border-none="true">
            <template slot="head-title">
                <i class="el-icon-collection"></i>
                <span>最新攻略</span>
            </template>
            <template slot="body">
                <div class="wiki-post-list" v-if="newest_posts.length">
                    <div class="wiki-post" v-for="(post, key) in newest_posts" :key="key">
                        <div class="m-about-post">
                            <div class="m-wiki">
                                <div class="u-wiki">
                                    <img class="u-icon" :src="icon_url(post.source_icon_id)"
                                        @error.once="$event.target.src = icon_url()" />
                                    <router-link class="u-name" v-text="post.title" :to="{
                                        name: 'view',
                                        params: { item_id: post.source_id },
                                    }"></router-link>
                                </div>
                                <div class="u-level" v-text="'综合难度：' + star(post.level)"></div>
                                <div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
                            </div>
                            <div class="m-user">
                                <div class="u-author">
                                    <img class="u-icon" :src="showAvatar(post.user_avatar)" :alt="post.user_nickname" />
                                    <a :href="post.user_id | author_url" class="u-name" v-text="post.user_nickname"
                                        v-if="post.user_id"></a>
                                    <span v-else class="u-name">{{ post.user_nickname }}</span>
                                </div>
                                <div class="u-updated" v-text="date_format(post.updated)"></div>
                            </div>
                        </div>
                        <div class="m-excerpt">
                            <router-link class="u-excerpt" v-html="ellipsis(post.excerpt)" :to="{
                                name: 'view',
                                params: { item_id: post.source_id },
                            }"></router-link>
                        </div>
                    </div>
                </div>
                <div v-else style="text-align: center">😂 暂无攻略</div>
            </template>
        </WikiPanel>
    </div>
</template>

<script>
import GamePrice from "@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import Search from "../components/Search.vue";
import { get_item_groups_with_price } from "@/service/item_group";
import { iconLink, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { get_item_posts, get_items_search_hottest } from "../service/item.js";
import { __iconPath, feedback, default_avatar } from "@jx3box/jx3box-common/data/jx3box.json";
import { date_format, star } from "../filters";
export default {
    name: "Home",
    data () {
        return {
            newest_posts: [],
            new_plans: [],
            hot_plans: [],
            feedback: feedback,
            plan_2_icon: __iconPath + "icon/2410.png",
            plan_1_icon: __iconPath + "icon/3089.png",
        };
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
    },
    components: {
        Search,
        WikiPanel,
        GamePrice
    },
    methods: {
        icon_url: function (id) {
            return iconLink(id, this.client);
        },
        ellipsis (value) {
            value = value ? value.trim() : "";
            if (value.length > 100) {
                return value.slice(0, 100) + "...";
            }
            return value;
        },
        chuck (arr, number = 3) {
            let output = [];
            for (let i = 0; i < arr.length; i += number) {
                output.push(arr.slice(i, i + number));
            }
            return output;
        },
        date_format,
        star,

        showAvatar: function (val) {
            return (val && getThumbnail(val, 20, true)) || getThumbnail(default_avatar, 20, true);
        },
        showItemTrending: function (item) {
            if (item.sub_days_0_price && item.sub_days_1_price) {
                if (item.sub_days_0_price - item.sub_days_1_price > 0) {
                    return "▲";
                } else if (item.sub_days_0_price - item.sub_days_1_price < 0) {
                    return "▼";
                } else {
                    return "";
                }
            }
        },
        showItemTrendingClass: function (item) {
            if (item.sub_days_0_price && item.sub_days_1_price) {
                if (item.sub_days_0_price - item.sub_days_1_price > 0) {
                    return "up";
                } else if (item.sub_days_0_price - item.sub_days_1_price < 0) {
                    return "down";
                } else {
                    return "keep";
                }
            }
        },
                // 描述过滤
        description_filter(value) {
            let matchs = /text="(.*?)(\\\\\\n)?"/.exec(value);
            if (matchs && matchs.length > 1) value = matchs[1].trim();
            if (value) value = value.replace(/\\n/g, "<br>");
            return value || '暂无介绍';
        },
    },
    created () {
        get_item_posts().then((res) => {
            res = res.data;
            this.newest_posts = res.data.newest;
        });
        get_items_search_hottest({ server: '梦江南' }).then((res) => {
            this.hot_plans = this.chuck(Object.values(res.data.data.items));
        })
        get_item_groups_with_price({
            server: '蝶恋花',
            keys: 'teshucailiao',
        }).then((res) => {
            let items = res.data.data.teshucailiao.items.slice(0, 15);
            let list = []
            for (let i = 0; i < items.length; i += 3) {
                list.push(items.slice(i, i + 3));
            }
            this.new_plans = list
            console.log(...this.new_plans)

        })

    },
};
</script>

<style lang="less">
@import "../assets/css/views/home.less";
</style>
