<template>
    <div class="m-plans-my">
        <div class="m-my-item-plans">
            <h3 class="c-sidebar-right-title">
                <i class="u-icon u-icon-mycollection"
                    ><img svg-inline src="../assets/img/plan.svg"
                /></i>
                <span>我的清单</span>
                <a
                    class="fr el-button el-button--success el-button--mini"
                    :href="publish_url(`item/plan`)"
                >
                    <i class="el-icon-document-add"></i>
                    <span>创建</span>
                </a>
            </h3>
            <template v-if="data && data.length">
                <router-link
                    class="m-my-item-plan"
                    v-for="(plan, key) in data"
                    :key="key"
                    :to="{ name: 'plan_view', params: { plan_id: plan.id } }"
                >
                    <h5 class="u-title">
                        <i class="el-icon-lock" v-if="!plan.public"></i> 
                        <span>{{plan.title}}</span>
                    </h5>
                    <div class="u-misc">
                        <div class="u-delete" @click="delete_plan($event, plan.id)">
                            <i class="el-icon-delete " title="删除"></i>
                        </div>
                        <div class="u-edit" @click="edit_plan($event, plan.id)">
                            <i class="el-icon-edit " title="编辑"></i>
                        </div>
                        <span class="u-updated">编辑于{{$options.filters.date_format(plan.updated)}}</span>
                    </div>
                </router-link>
                <a class="u-more" href="/dashboard/#/other" target="_blank"
                    >查看更多 &raquo;</a
                >
            </template>
            <!-- <div class="u-tip" v-else-if="user.uid">暂无物品清单记录</div> -->
            <!-- <div class="u-tip" v-else>请先进行登录</div> -->
        </div>
    </div>
</template>

<script>
import { get_my_item_plans } from "@/service/item_plan.js";
import { __Links } from "@jx3box/jx3box-common/js/jx3box.json";
export default {
    name: "",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        data: function() {
            return this.$store.state.my_item_plans;
        },
    },
    methods: {
        publish_url(val) {
            return `${__Links.dashboard.publish}#/${val}`;
        },
    },
    mounted: function() {
        // 获取我的清单
        get_my_item_plans();
    },
    components: {},
};
</script>
