<template>
	<div class="m-plan-view" v-loading="loading"></div>
    
</template>
<script>
// import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import { getItemPlanID } from "../service/item_plan.js";
import { WikiPost } from "@jx3box/jx3box-common/js/helper";
export default {
	name: "demo",
	props: [],
	components: {
		// WikiPanel,
	},
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
<style lang="less">
//@import '@/assets/css/demo.less';
</style>
