<template>
	<div class="m-plan-list" v-loading="loading">
<!-- 头部 & 标题+搜索 -->
		<h1 class="m-plan-title">物品清单</h1>
		<div class="m-plan-search">
			<el-input placeholder="请输入搜索内容" v-model="search">
				<span slot="prepend">关键词</span>
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>

	</div>
</template>
<script>
//import { demo } from '@/utils/common.js';
//import xSearch from '@/components/search.vue';
export default {
	name: "demo",
	props: [],
	components: {
		//demo
	},
	data: function () {
		return {
			loading: false,
		};
	},
	computed: {},
	watch: {},
	methods: {},
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
//@import '@/assets/css/demo.less';
</style>
