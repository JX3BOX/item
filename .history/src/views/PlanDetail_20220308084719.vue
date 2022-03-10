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
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
export default {
	name: "demo",
	props: [],
	components: {
		WikiPanel,
	},
	data: function () {
		return {
			loading: false,
		};
	},
	computed: {
		item_id() {
			return 1;
		},
		type() {
			return 1;
		},
	},
	watch: {},
	methods: {},
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
//@import '@/assets/css/demo.less';
</style>
