<template>
    <div class="m-extend" :class="{ isHome: isHome }">
        <RightSideMsg>
            <em>官方反馈交流Q群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=5S50j08">614370825</a>
            </strong>
        </RightSideMsg>

        <MyItems />
        <MyPlans />

    </div>
</template>

<script>
const { JX3BOX } = require("@jx3box/jx3box-common");
import User from "@jx3box/jx3box-common/js/user.js";
import { get_my_item_plans, delete_item_plan } from "../service/item_plan.js";
import MyPlans from '@/components/MyPlans.vue'
import MyItems from '@/components/MyItems.vue'
export default {
    name: "Extend",
    props: [],
    data: function() {
        return {
            isHome: true,
            hot_items: null,
            user: User.getInfo(),
        };
    },
    components: {
        MyPlans,
        MyItems
    },
    methods: {
        edit_plan($event, plan_id) {
            $event.preventDefault();
            location.href = this.publish_url(`item/plan/${plan_id}`);
            return false;
        },
        delete_plan($event, plan_id) {
            $event.preventDefault();
            this.$confirm("确认是否删除该物品清单？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                delete_item_plan(plan_id).then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.$message.success(data.message);
                        // 获取我的清单
                        get_my_item_plans();
                    } else {
                        this.$message.error(data.message);
                    }
                });
            });
            return false;
        },
        checkIsHome: function() {
            this.isHome = this.$route.name == "home" || !this.$route.name;
        },
        chuck(arr, number = 3) {
            let output = [];
            for (let i = 0; i < arr.length; i += number) {
                output.push(arr.slice(i, i + number));
            }
            return output;
        },
        img_error_handle(e) {
            e.target.src = `${JX3BOX.__ossRoot}image/common/nullicon.png`;
        },
        publish_url(val) {
            return `${JX3BOX.__Links.dashboard.publish}#/${val}`;
        },
    },
    watch: {
        "$route.name": function(newpath) {
            this.checkIsHome();
        },
    },
    mounted: function() {
        this.checkIsHome();
    },
};
</script>

<style lang="less">
@import "../assets/css/components/extend.less";
</style>
