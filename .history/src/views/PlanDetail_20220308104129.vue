<template>
	<div class="m-plan-view" v-loading="loading">
       <div class="m-pet-navigation">
            <el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
            <div class="m-pet-links">
                <a class="u-link u-item" :href="getLink('item', item_id)" target="_blank"><i class="el-icon-collection-tag"></i>物品信息</a>
                <template v-if="achievement_id">
                    <em> | </em>
                    <a class="u-link u-achievement" :href="getLink('cj', achievement_id)" target="_blank"><i class="el-icon-trophy"></i>成就信息</a>
                </template>
            </div>
        </div>
    </div>

</template>
<script>
import { getItemPlanID } from "../service/item_plan.js";
export default {
	name: "demo",
	props: [],
	components: {
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
