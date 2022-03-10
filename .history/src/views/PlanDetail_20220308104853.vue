<template>
	<div class="v-plan-view" v-loading="loading">
		<!-- 返回 & 收藏 -->
		<div class="m-plan-navigation">
			<el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
		</div>
		<!-- 内容展示 -->
		<!-- 物品 -->
		<div class="m-plan-content m-plan-item" v-if="plan.type == '1'">

        </div>
		<!-- 装备 -->
		<div class="m-plan-content m-plan-equip" v-else>
            
        </div>
	</div>
</template>
<script>
import { getItemPlanID } from "../service/item_plan.js";
export default {
	name: "demo",
	props: [],
	components: {},
	data: function () {
		return {
			loading: false,
			plan: "",
		};
	},
	computed: {
		plan_id() {
			return this.$route.params.plan_id;
		},
		type() {
			return 1;
		},
	},
	watch: {},
	methods: {
		// 获取数据
		getItemData() {
			getItemPlanID(this.plan_id)
				.then((res) => {
					this.plan = res;
				})
				.finally(() => {
					this.loading = false;
				});
		},
		// 返回列表
		goBack() {
			this.$router.push({ name: "plan_list" });
		},
	},
	created: function () {
		this.getItemData();
	},
};
</script>
<style lang="less" scoped>
@import "../assets/css/views/plan_detail.less";
</style>
