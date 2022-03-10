<template>
	<div class="v-plan-list" v-loading="loading">
		<!-- 头部 - 标题&搜索 -->
		<div class="m-plan-title">物品清单</div>
		<div class="m-plan-search">
			<el-input placeholder="请输入搜索内容" v-model="search">
				<span slot="prepend">关键词</span>
				<el-button slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
		<!-- 列表 -->
		<div class="m-plan-list">
			<div class="u-list">
				<img :src="listImg(1)" alt="" />
				<div class="u-cont">
					<span class="u-title"></span>
					<span class="u-desc"></span>
					<span class="u-user">
						<a class="u-name"></a>
						<span class="u-time"></span>
					</span>
				</div>
			</div>
		</div>
		<el-pagination class="m-archive-pages" background layout="total, prev, pager, next, jumper" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page"></el-pagination>
	</div>
</template>
<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
	name: "demo",
	props: [],
	components: {
		//demo
	},
	data: function () {
		return {
			loading: false,
			search: "",

			page: 1,
			total: 1,
			pages: 1,
		};
	},
	computed: {},
	watch: {},
	methods: {
		listImg(val) {
			return val == 1 ? __iconPath + "icon/3089.png" : __iconPath + "icon/2410.png";
		},
	},
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
@import "../assets/css/views/plan_list.less";
</style>
