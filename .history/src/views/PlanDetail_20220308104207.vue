<template>
	<div class="v-plan-view" v-loading="loading">
		<div class="m-plan-navigation">
			<el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
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
		getItemData() {
			getItemPlanID(this.plan_id)
				.then((res) => {
					console.log(res);
					this.data = res.data;
				})
				.finally(() => {
					this.loading = false;
				});
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
