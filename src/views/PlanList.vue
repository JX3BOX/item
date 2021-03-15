<template>
    <div class="m-item-index m-item-plan-list">
        <PlanSearch />
        <div class="m-plans">
            <template v-if="item_plans && item_plans.length">
                <router-link
                    :to="{
                        name: 'plan_view',
                        params: { plan_id: plan.id },
                    }"
                    v-for="(plan, key) in item_plans"
                    :key="key"
                    class="m-plan-item"
                >
                    <div class="u-icon">
                        <span
                            v-if="plan.type == 1"
                            class="u-type"
                            :class="'u-type-' + plan.type"
                        >
                            <img :src="plan_1_icon" />
                        </span>
                        <span
                            v-if="plan.type == 2"
                            class="u-type"
                            :class="'u-type-' + plan.type"
                        >
                            <img :src="plan_2_icon" />
                        </span>
                    </div>
                    <div class="u-title">{{ plan.title }}</div>
                    <div class="u-description">
                        {{ plan.description || "By " + plan.user_nickname }}
                    </div>
                    <div class="u-meta">
                        <!-- <span class="u-author">
                            <img
                                class="u-avatar"
                                :src="plan.user_avatar | resolveAvatarPath"
                                :alt="plan.user_nickname"
                            />
                            <a
                                class="u-nickname"
                                :href="plan.user_id | author_url"
                                v-text="plan.user_nickname"
                            ></a>
                        </span> -->
                        <span
                            class="u-updated"
                            v-text="$options.filters.date_format(plan.created)"
                        ></span>
                    </div>
                </router-link>
            </template>
            <el-alert
                v-else
                center
                title="😂 暂无物品清单"
                class="m-plan-null"
                type="info"
                :closable="false"
            ></el-alert>
        </div>
        <el-pagination
            background
            :total="item_plans_total"
            hide-on-single-page
            layout="prev, pager, next"
            :current-page="page"
            :page-size="length"
            prev-html="&laquo;"
            next-html="&raquo;"
            @current-change="page_change_handle"
        ></el-pagination>
    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
import PlanSearch from "../components/PlanSearch";
import { get_item_plans } from "../service/item_plan.js";
import { getThumbnail, resolveImagePath } from "@jx3box/jx3box-common/js/utils";
import { default_avatar } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    name: "PlanList",
    data: function() {
        return {
            item_plans: null,
            item_plans_total: 0,
            page: 1,
            length: 20,

            plan_2_icon: JX3BOX.__iconPath + "icon/2410.png",
            plan_1_icon: JX3BOX.__iconPath + "icon/3089.png",
        };
    },
    components: {
        PlanSearch,
    },
    methods: {
        page_change_handle(page) {
            this.$router.push({ name: "plan_list", query: { page: page } });
        },
    },
    watch: {
        $route: {
            immediate: true,
            handler() {
                this.page = parseInt(this.$route.query.page);
                let keyword = this.$route.params.keyword
                    ? this.$route.params.keyword
                    : "";
                // 获取物品清单列表
                get_item_plans({
                    keyword: keyword,
                    page: this.page,
                    limit: this.length,
                }).then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.item_plans = data.data.data;
                        this.item_plans_total = data.data.total;
                    } else {
                        this.item_plans = null;
                        this.item_plans_total = 0;
                    }
                });
            },
        },
    },
    filters: {
        resolveAvatarPath: function(val) {
            return resolveImagePath(val);
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/views/plan_list.less";
</style>
