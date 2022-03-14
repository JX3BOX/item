<template>
    <el-popover popper-class="w-plans" placement="bottom" trigger="click" v-model="visible">
        <el-input class="m-input" v-model.lazy="search" placeholder="请输入清单关键字"></el-input>
        <div class="m-list" v-if="list && list.length">
            <div class="u-list" v-for="(item, index) in list" :key="index">
                <div class="u-title" @click="addToPlan(item)">
                    <i class="u-icon el-icon-caret-right"></i>
                    <span><em class="u-status" v-if="hasInPlan(item)">(已加入)</em>{{ item.title }}</span>
                </div>
				<!-- TODO:子清单逻辑 -->
                <!-- <template v-if="plan_index == index && item.relation">
					<div class="u-child" v-for="(plan, key) in item.relation" :key="key" @click="addItemPlan(item, key)">
						<i class="el-icon-arrow-right"></i>
						<span>{{ plan.title || "子清单" + (key + 1) }}</span>
					</div>
				</template> -->
            </div>
        </div>
        <div v-else class="m-list"><el-alert title="暂无清单" type="info" center show-icon :closable="false"> </el-alert></div>

        <div class="m-create">
            <a href="/publish/#/item_plan" target="_blank" class="el-button"><i class="el-icon-document-add"></i> <span>创建新清单</span></a>
        </div>

        <el-button size="mini" type="success" slot="reference" @click="openPlans"><i class="u-el-icon el-icon-shopping-cart-full"></i> 加入清单</el-button>
    </el-popover>
</template>
<script>
    import User from "@jx3box/jx3box-common/js/user";
    import { getMyPlans, postMyPlans } from "../service/item_plan.js";
    export default {
        name: "plan",
        props: [],
        data: function() {
            return {
                visible: false,

                search: "",
                list: [],

                plan_index: -1,
            };
        },
        computed: {
            item_id: function() {
                return this.$route.params.item_id;
            },
        },
        watch: {
            search(val) {
                this.loadPlans({ search: val });
            },
        },
        methods: {
            // 数据
            // ========================
            // 打开我的清单列表，未登录则跳转登录页
            openPlans() {
                if (!User.isLogin()) User.toLogin();
                this.loadPlans({ page: 1, limit: 8 });
            },
            // 加载清单列表
            loadPlans(params) {
                let _params = Object.assign({ type: 1 }, params);
                getMyPlans(_params).then((res) => {
                    this.list = res.list;
                });
            },

            // 交互
            // =========================
            // 是否在清单内
            hasInPlan(item) {
                let plan_items = [];
                item.relation.forEach((subplan) => {
                    subplan?.data.forEach((e) => {
                        if (e) plan_items.push(e?.id);
                    });
                });
                return plan_items.includes(this.item_id);
            },
            // 加入物品清单
            addToPlan(item, key) {
                if (!item.relation?.length) {
                    item.relation = [];
                    item.relation.push({
                        title: "子清单名称",
                        data: [],
                    });
                }
                // TODO:加到对应的子清单
                item.relation[0].data.push({
                    id: this.item_id,
                    count: 1,
                });
                this.postPlan(item.id, item);
            },
            // 提交清单
            postPlan(id, data) {
                postMyPlans(id, data).then(() => {
                    this.$message({
                        message: "添加成功",
                        type: "success",
                    });
                    this.visible = false;
                });
            },
        },
    };
</script>
<style lang="less" scoped>
    .w-plans {
        max-height: 800px;
        overflow-y: auto;
        .m-create {
            .x;
            .mt(10px);
            padding-top: 10px;
            border-top: 1px solid #eee;
            .el-button {
                padding: 8px 20px;
            }
        }
        .m-list {
            .pt(10px);
        }

        .u-list {
            .fz(14px, 2);
            .pointer;
            .u-title {
                &:hover {
                    color: @color-link;
                    background-color: @bg-gray;
                    .u-icon::after {
                        content: "✚";
                    }
                    .u-icon::before {
                        .none;
                    }
                }
            }
            .has-child {
                &::after {
                    content: "  ";
                    .fr;
                }
            }
            .u-status {
                color: #999;
                font-style: normal;
                .mr(5px);
            }

            .u-child {
                .pl(1em);
            }
            i {
                .mr(5px);
            }
        }
        // .u-item .u-child:hover:before {
        // 	content: " ✚ ";
        // 	.fr;
        // }
        // .u-equip:hover:before {
        // 	content: " ✚ ";
        // 	.fr;
        // }
    }
</style>
<style>
    .w-plans {
        z-index: 99 !important;
        width: 180px;
    }
    .m-item-icon-popup {
        padding: 0;
    }
</style>
