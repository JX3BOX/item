<template>
	<div class="v-plan-view" v-loading="loading">
		<!-- 返回 & 收藏 -->
		<div class="m-plan-navigation">
			<el-button class="u-goback" size="medium" icon="el-icon-arrow-left" @click="goBack" plain>返回列表</el-button>
		</div>
		<!-- 内容展示 -->
		<WikiPanel class="m-plan-content" :wiki-post="plan">
			<!-- 头部标题 -->
			<template slot="head-title">
				<i class="el-icon-tickets"></i>
				<span class="u-plan-title">{{ plan.type == "1" ? "道具清单" : "装备清单" }} - {{ plan.title }} </span>
			</template>
			<!-- 编辑 & 删除 & 收藏 -->
			<template slot="head-actions">
				<Fav post-type="item_plan" :post-id="plan.id" />
				<template v-if="isAuthor">
					<el-button type="primary" icon="el-icon-edit" size="mini" plain @click="editPlan(plan.id)">编辑</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini" plain @click="deletePlan(plan.id)">删除</el-button>
				</template>
			</template>
			<!-- 详细内容 -->
			<template slot="body">
				<!-- 物品 -->
				<div class="m-plan-item" v-if="plan.type == '1'">
					<div class="m-item" v-for="(item, index) in plan.relation" :key="index">
						<div class="u-title">{{ item.title }}</div>
						<div class="u-content">
							<div class="u-item" v-for="(plan, key) in converted(item.data)" :key="key"></div>
						</div>
					</div>
				</div>
				<!-- 装备 -->
				<div class="m-plan-equip" v-else></div>
			</template>
		</WikiPanel>

		<!-- 评论 -->
		<div>
			<el-divider content-position="left">讨论</el-divider>
			<Comment :id="plan_id" category="plan_view" />
		</div>
	</div>
</template>
<script>
import { getItemPlanID, delItemPlans } from "../service/item_plan.js";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
const default_equip = [
	[
		{ title: "melee_weapon", label: "武器", AucGenre: 1, list: [] },
		{ title: "range_weapon", label: "暗器", AucGenre: 2, list: [] },
	],
	[
		{ title: "helm", label: "帽子", AucGenre: 3, AucSubType: 2, list: [] },
		{ title: "chest", label: "上衣", AucGenre: 3, AucSubType: 1, list: [] },
		{ title: "waist", label: "腰带", AucGenre: 3, AucSubType: 3, list: [] },
	],
	[
		{ title: "bangle", label: "护腕", AucGenre: 3, AucSubType: 6, list: [] },
		{ title: "pants", label: "下装", AucGenre: 3, AucSubType: 4, list: [] },
		{ title: "boots", label: "鞋子", AucGenre: 3, AucSubType: 5, list: [] },
	],
	[
		{ title: "amulet", label: "项链", AucGenre: 4, AucSubType: 1, list: [] },
		{ title: "pendant", label: "腰坠", AucGenre: 4, AucSubType: 3, list: [] },
		{ title: "ring_1", label: "戒指", AucGenre: 4, AucSubType: 2, list: [] },
		{ title: "ring_2", label: "戒指", AucGenre: 4, AucSubType: 2, list: [] },
	],
];
export default {
	name: "demo",
	props: [],
	components: { Comment, WikiPanel },
	data: function () {
		return {
			loading: false,

			isAuthor: true,
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
		// 转换数据
		converted(data) {
			return data;
		},
		// 编辑清单
		editPlan(plan_id) {
			location.href = this.publish_url(`item_plan/${plan_id}`);
		},
		// 删除清单
		deletePlan(plan_id) {
			this.$confirm("确认是否删除该物品清单？", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			}).then(() => {
				delItemPlans(plan_id)
					.then((res) => {
						this.$message.success(res.message);
						this.$router.push({ name: "plan_list" });
					})
					.catch((e) => {
						this.$message.error(e.message);
					});
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
