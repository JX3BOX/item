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
				<img class="u-img" :src="listImg(1)" alt="" />
				<div class="u-cont">
					<span class="u-title">PVE</span>
					<span class="u-desc">装等显示有问题凑合看吧，五彩石要用【碎冰·霜冷·冻髓】的命中五彩。 项链可以用侠义，武器是瞿塘峡镖师声望，要用黑龙令刷。 其他装备除了戒指都在25战宝里，戒指是英雄稻香村老四出的，有其他命中戒指替换的话也可以，命中应该在106，开阵109差不多了。 如果补命中附魔的话戒指可以不穿这俩穿侠义的，或者换掉命中五彩石打会破攻。</span>
					<span class="u-user">
						<a class="u-name">3</a>
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
					this.plans = res.data;
				})
				.finally(() => {
					this.loading = false;
				});
		},
		listImg(val) {
			return val == 1 ? __iconPath + "icon/3089.png" : __iconPath + "icon/2410.png";
		},
	},
	created: function () {
        this.getPlansData()
    },
	mounted: function () {},
};
</script>
<style lang="less">
@import "../assets/css/views/plan_list.less";
</style>
