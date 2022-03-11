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
                        <router-link
                            :to="{
                                name: 'search',
                                query: {
                                    ids: '5_24423,5_24424,5_24425,5_24426,5_24427,5_24428,5_24429,5_24430',
                                },
                            }"
                        >
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
                </ul>
            </template>
        </WikiPanel>

        <StarMarkItems />

        <!-- <WikiPanel border-none="true">
            <template slot="head-title">
                <i class="el-icon-notebook-1"></i>
                <span>最新清单</span>
            </template>
            <template slot="head-actions">
                <router-link :to="{ name: 'plan_list' }" class="u-more">查看更多 &raquo;</router-link>
            </template>
            <template slot="body">
                <div class="m-plan-list">
                    <el-carousel
                        height="66px"
                        direction="vertical"
                        indicator-position="none"
                        v-if="newest_plans && newest_plans.length"
                    >
                        <el-carousel-item
                            v-for="(items, key) in newest_plans"
                            :key="key"
                            class="m-carousel"
                        >
                            <el-row :gutter="20">
                                <template v-for="(item, k) in items">
                                    <el-col :md="8" v-if="item" :key="k">
                                        <router-link
                                            class="u-item"
                                            :class="`u-item-${k}`"
                                            :to="'/plan_view/' + item.id"
                                        >
                                            <div class="u-icon">
                                                <span
                                                    v-if="item.type == 1"
                                                    class="u-type"
                                                    :class="
                                                        'u-type-' + item.type
                                                    "
                                                >
                                                    <img :src="plan_1_icon" />
                                                </span>
                                                <span
                                                    v-if="item.type == 2"
                                                    class="u-type"
                                                    :class="
                                                        'u-type-' + item.type
                                                    "
                                                >
                                                    <img :src="plan_2_icon" />
                                                </span>
                                            </div>
                                            <div class="m-carousel-content">
                                                <span class="u-title">
                                                    <span v-text="item.title"></span>
                                                </span>
                                                <span class="u-desc">
                                                    <i class="el-icon-mic"></i>
                                                    <span>
                                                        {{
                                                        item.description ||
                                                        "By " +
                                                        item.user_nickname
                                                        }}
                                                    </span>
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
        </WikiPanel>-->

        <WikiPanel border-none="true">
            <template slot="head-title">
                <i class="el-icon-collection"></i>
                <span>最新攻略</span>
            </template>
            <template slot="body">
                <div class="wiki-post-list" v-if="newest_posts.length">
                    <div class="wiki-post" v-for="(post, key) in newest_posts" :key="key">
                        <div class="m-about-post">
                            <div class="m-user">
                                <div class="u-author">
                                    <img class="u-icon" :src="post.user_avatar | showAvatar" :alt="post.user_nickname" />
                                    <a :href="post.user_id | author_url" class="u-name" v-text="post.user_nickname" v-if="post.user_id"></a>
                                    <span v-else class="u-name">{{ post.user_nickname }}</span>
                                </div>
                                <div class="u-updated" v-text="date_format(post.updated)"></div>
                            </div>
                            <div class="m-wiki">
                                <div class="u-wiki">
                                    <img class="u-icon" :src="icon_url(post.source_icon_id)" @error.once="$event.target.src = icon_url()" />
                                    <router-link
                                        class="u-name"
                                        v-text="post.title"
                                        :to="{
                                            name: 'view',
                                            params: { item_id: post.source_id },
                                        }"
                                    ></router-link>
                                </div>
                                <div class="u-level" v-text="'综合难度：' + star(post.level)"></div>
                                <div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
                            </div>
                        </div>
                        <div class="m-excerpt">
                            <router-link
                                class="u-excerpt"
                                v-html="ellipsis(post.excerpt)"
                                :to="{
                                    name: 'view',
                                    params: { item_id: post.source_id },
                                }"
                            ></router-link>
                        </div>
                    </div>
                </div>
                <div v-else style="text-align: center">😂 暂无攻略</div>
            </template>
        </WikiPanel>
    </div>
</template>

<script>
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import Search from "../components/Search.vue";
import StarMarkItems from "../components/StarMarkItems.vue";
import { iconLink, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { get_item_posts } from "../service/item.js";
import { get_item_plans } from "../service/item_plan.js";
import { __iconPath, feedback, default_avatar } from "@jx3box/jx3box-common/data/jx3box.json";
import { date_format, star } from "../filters";
export default {
    name: "Home",
    data() {
        return {
            newest_posts: [],
            newest_plans: [],
            feedback: feedback,
            plan_2_icon: __iconPath + "icon/2410.png",
            plan_1_icon: __iconPath + "icon/3089.png",
        };
    },
    computed: {
        client: function() {
            return this.$store.state.client;
        },
    },
    components: {
        Search,
        WikiPanel,
        StarMarkItems,
    },
    methods: {
        icon_url: function(id) {
            return iconLink(id, this.client);
        },
        ellipsis(value) {
            value = value ? value.trim() : "";
            if (value.length > 100) {
                return value.slice(0, 100) + "...";
            }
            return value;
        },
        chuck(arr, number = 3) {
            let output = [];
            for (let i = 0; i < arr.length; i += number) {
                output.push(arr.slice(i, i + number));
            }
            return output;
        },
        date_format,
        star,
    },
    created() {
        get_item_posts().then((res) => {
            res = res.data;
            this.newest_posts = res.data.newest;
        });

        get_item_plans({ limit: 15 }).then((res) => {
            res = res.data;
            this.newest_plans = this.chuck(Object.values(res.data.data));
        });
    },
    filters: {
        showAvatar: function(val) {
            return (val && getThumbnail(val, 20, true)) || getThumbnail(default_avatar, 20, true);
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/views/home.less";
</style>
