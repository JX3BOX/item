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
			<router-link class="m-item" v-for="(plan, key) in plans" :key="key" :to="{ name: 'plan_view', params: { plan_id: plan.id } }">
				<img class="u-img" :src="listImg(plan.type)" alt="" />
				<div class="u-cont">
					<span class="u-title">{{ plan.title }}</span>
					<span class="u-desc">{{ plan.description }}</span>
					<span class="u-user">
						<img class="u-vat" src="" alt="" srcset="" />
						<a class="u-name" :h>3</a>
						<span class="u-time">3</span>
					</span>
				</div>
			</router-link>
		</div>
		<el-pagination class="m-archive-pages" background layout="total, prev, pager, next, jumper" :hide-on-single-page="true" :page-size="per" :total="total" :current-page.sync="page"></el-pagination>
	</div>
</template>
<script>
import { __iconPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getItemPlans } from "../service/item_plan.js";
import { showAvatar, authorLink } from "@jx3box/jx3box-common/js/utils";
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
			plans: [],

			page: 1,
			per: 10,
			total: 1,
			pages: 1,
		};
	},
	computed: {},
	watch: {},
	methods: {
		// 获取数据
		// =========================
		getPlansData() {
			this.loading = true;
			getItemPlans()
				.then((res) => {
					this.plans = res.list;
				})
				.finally(() => {
					this.loading = false;
				});
		},
		// 转换展示数据
		listImg(val) {
			return val == 1 ? __iconPath + "icon/3089.png" : __iconPath + "icon/2410.png";
		},
		showAvatar,
		authorLink,
	},
	created: function () {
		this.getPlansData();
	},
	mounted: function () {},
};
</script>
<style lang="less">
@import "../assets/css/views/plan_list.less";
</style>
