<template>
    <div id="m-plan-view" v-loading="loading">
        <PlanSearch />
        <div class="m-plan">
            <div v-if="plan && JSON.stringify(plan) !== '{}'" class="m-module m-plan">
                <div class="m-head">
                    <h4 class="u-title">
                        <span v-if="plan.type == 1" style="background-color:#409EFF" class="u-type">道具清单</span>
                        <span v-if="plan.type == 2" style="background-color:#3cbfda" class="u-type">装备清单</span>
                        <span v-text="plan.title"></span>
                    </h4>
                </div>
                <div class="m-body">
                    <div v-if="plan.description" class="u-plan-description" :title="plan.description" type="warning" :closable="false">
                        {{ plan.description }}
                    </div>
                    <!-- 道具清单 -->
                    <el-row :gutter="15" class="m-positions" v-if="plan.type == 1">
                        <el-col class="u-col" :span="12" v-for="(position, key) in plan.relation_items" :key="key">
                            <div class="m-position">
                                <h5 v-if="position.title" class="u-title">
                                    <span v-text="position.title"></span>
                                </h5>
                                <ul class="m-items">
                                    <li v-for="(item, k) in position.data" :key="k">
                                        <router-link
                                            :to="{
                                                name: 'view',
                                                params: { item_id: item.id },
                                            }"
                                        >
                                            <jx3-item-simple :item="item" />
                                        </router-link>
                                    </li>
                                    <li v-if="!position.data || !position.data.length" class="u-items-null">
                                        暂无物品
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>
                    <!-- 装备清单 -->
                    <div class="m-equip-plan" v-if="plan.type == 2">
                        <Equip :data="plan" />
                    </div>
                    <el-row :gutter="15" class="m-positions" v-if="plan.type == 2">
                        <el-col :xs="24" :md="6" v-for="(_positions, index) in positions" :key="index">
                            <div class="m-position" v-for="(position, key) in _positions" :key="key">
                                <h5 v-if="position.label" class="u-title">
                                    <span v-text="position.label"></span>
                                </h5>
                                <ul class="m-items">
                                    <li v-for="(item, k) in plan.relation_items[key]" :key="k">
                                        <router-link
                                            :to="{
                                                name: 'view',
                                                params: { item_id: item.id },
                                            }"
                                        >
                                            <jx3-item-simple :item="item" />
                                            <span v-if="k == 0" class="u-main">主</span>
                                        </router-link>
                                    </li>
                                    <li v-if="!plan.relation_items[key] || !plan.relation_items[key].length" class="u-items-null">
                                        暂无物品
                                    </li>
                                </ul>
                            </div>
                        </el-col>
                    </el-row>

                    <div class="m-other">
                        <div v-if="plan.user_avatar" class="avatar">
                            <img :src="showAvatar(plan.user_avatar)" />
                        </div>
                        <div class="done">
                            <a :href="plan.user_id | author_url" v-text="plan.user_nickname"></a>
                        </div>
                        <div class="updated" v-text="'最后编辑于 ' + $options.filters.date_format(plan.updated)"></div>
                    </div>
                </div>
                <div class="m-plan-op">
                    <template v-if="hasRight">
                        <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="edit_plan(plan.id)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" plain @click="delete_plan(plan.id)">删除</el-button>
                    </template>
                    <Fav v-else post-type="item_plan" :post-id="plan.id" />
                </div>
            </div>
            <el-alert v-else center title="😂 暂无相关物品清单信息" class="m-plan-null" type="info" :closable="false"></el-alert>
        </div>

        <div class="m-comments" v-if="plan && JSON.stringify(plan) !== '{}'">
            <el-divider content-position="left"
                ><span style="color:#999999"><i class="el-icon-chat-line-square"></i> 讨论</span></el-divider
            >
            <jx3-comment :id="plan.id" category="item_plan" />
        </div>
    </div>
</template>

<script>
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import ItemSimple from "@jx3box/jx3box-editor/src/ItemSimple";
import Equip from "@jx3box/jx3box-editor/src/Equip";
import { get, set } from "lodash";
import EquipPosition from "@jx3box/jx3box-editor/service/enum/EquipPosition";
import Fav from "@jx3box/jx3box-common-ui/src/interact/Fav.vue";
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
import User from "@jx3box/jx3box-common/js/user.js";
import PlanSearch from "../components/PlanSearch";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { showAvatar } from "@jx3box/jx3box-common/js/utils";
import { get_item_plan, get_my_item_plans, delete_item_plan } from "../service/item_plan";

export default {
    name: "PlanDetail",
    components: {
        "jx3-item-simple": ItemSimple,
        "jx3-comment": Comment,
        Equip,
        PlanSearch,
        Fav,
    },
    data: function() {
        let positions = [
            [EquipPosition.MELEE_WEAPON, EquipPosition.RANGE_WEAPON],
            [EquipPosition.HELM, EquipPosition.CHEST, EquipPosition.WAIST],
            [EquipPosition.BANGLE, EquipPosition.PANTS, EquipPosition.BOOTS],
            [EquipPosition.AMULET, EquipPosition.PENDANT, EquipPosition.RING_1, EquipPosition.RING_2],
        ];
        // 重置键名
        let all_positions = EquipPosition.all();
        for (let i in positions) {
            let _output = {};
            for (let key in positions[i]) {
                let type = get(positions, `${i}.${key}`);
                _output[type] = all_positions[type];
            }
            set(positions, i, _output);
        }

        return {
            user: User.getInfo(),
            plan: null,
            positions: positions,
            loading: false,
        };
    },
    computed: {
        hasRight: function() {
            return this.plan.user_id == User.getInfo().uid || User.isEditor();
        },
    },
    mounted: function() {
        postStat("item_plan", this.$route.params.plan_id);
    },
    watch: {
        "$route.params.plan_id": {
            immediate: true,
            handler() {
                if (this.$route.params.plan_id) {
                    this.loading = true;
                    get_item_plan(this.$route.params.plan_id)
                        .then((data) => {
                            data = data.data;
                            this.plan = data.data.plan;
                        })
                        .catch((e) => {
                            this.$message.error(e || "获取物品清单异常，请联系管理员");
                        })
                        .finally(() => {
                            this.loading = false;
                        });
                }
            },
        },
    },
    methods: {
        publish_url(val) {
            return `${__Links.dashboard.publish}#/${val}`;
        },
        edit_plan(plan_id) {
            location.href = this.publish_url(`item/plan/${plan_id}`);
        },
        delete_plan(plan_id) {
            this.$confirm("确认是否删除该物品清单？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                delete_item_plan(plan_id)
                    .then((data) => {
                        data = data.data;
                        this.$message.success(data.message);
                        // 获取我的清单
                        get_my_item_plans().then((res) => {
                            this.$store.commit("SET_STATE", { key: "my_item_plans", value: res.data.data.data });
                        });
                        // 返回主页
                        this.$router.push({ name: "home" });
                    })
                    .catch((e) => {
                        this.$message.error(e.message);
                    });
            });
        },
        showAvatar : function (url){
            return showAvatar(url,32)
        }
    },
};
</script>

<style lang="less" scoped>
@import "../assets/css/views/plan_detail.less";
</style>
