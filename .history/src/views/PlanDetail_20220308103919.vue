<template>
	<div class="m-plan-view" v-loading="loading">
		<WikiPanel :wiki-post="wiki_post">
			<template slot="head-title"> 
				<span class="u-txt">{{ title }}</span>
			</template>
			<template slot="head-actions">
				<a class="el-button el-button--primary" :href="publish_url">
					<i class="el-icon-edit"></i>
					<span>完善{{ title }}</span>
				</a>
			</template>
			<template slot="body">
				<div class="m-wiki-compatible" v-if="compatible"><i class="el-icon-warning-outline"></i> 暂无怀旧服攻略，以下为正式服攻略，仅作参考，<a class="s-link" :href="publish_url">参与修订</a>。</div>
				<Article :content="wiki_post.post.content" />
				<div class="m-wiki-signature">
					<i class="el-icon-edit"></i>
					本次修订由 <b>{{ user_name }}</b> 提交于{{ updated_at }}
				</div>
				<Thx class="m-thx" :postId="id" :postType="type" :adminBoxcoinEnable="false" :userBoxcoinEnable="false" />
			</template>
		</WikiPanel>
	</div>
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
                    console.log(res)
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
