<template>
	<el-popover popper-class="w-plans" placement="bottom" trigger="click" v-model="visible">
		<el-input class="m-input" v-model.lazy="search" placeholder="请输入清单关键字"></el-input>
		<div class="m-create">
			<a href="" target="_blank" class="el-button"><i class="el-icon-document-add"></i> <span>创建新清单</span></a>
		</div>
		<template v-if="plan_item">
			<div class="m-list" v-if="list.length">
				<div class="u-list" v-for="(item, index) in list" :key="index" :class="item.type == 1 ? 'u-item' : 'u-equip'">
					<div class="u-title" @click="changePlans(item, index)">
						<i :class="item.type == 2 ? 'el-icon-s-order' : plan_index == index ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
						<span>{{ item.title }}</span>
					</div>
					<template v-if="plan_index == index && item.relation">
						<div class="u-child" v-for="(plan, key) in item.relation" :key="key" @click="addItemPlan(item, key)">
							<i class="el-icon-arrow-right"></i>
							<span>{{ plan.title || "子清单" + (key + 1) }}</span>
						</div>
					</template>
				</div>
			</div>
			<div v-else class="m-list"><el-alert title="暂无清单" type="info" center show-icon :closable="false"> </el-alert></div>
		</template>

		<el-button size="mini" type="success" slot="reference" @click="openPlans"><i class="u-el-icon el-icon-shopping-cart-full"></i> 加入清单</el-button>
	</el-popover>
</template>
<script>
import User from "@jx3box/jx3box-common/js/user";
import { getMyPlans, postMyPlans, searchItemsID, getItemPlanID } from "../service/item_plan.js";
const default_equip = [
	{ title: "melee_weapon", label: "武器", AucGenre: 1 },
	{ title: "range_weapon", label: "暗器", AucGenre: 2 },
	{ title: "helm", label: "帽子", AucGenre: 3, AucSubType: 2 },
	{ title: "chest", label: "上衣", AucGenre: 3, AucSubType: 1 },
	{ title: "waist", label: "腰带", AucGenre: 3, AucSubType: 3 },
	{ title: "bangle", label: "护腕", AucGenre: 3, AucSubType: 6 },
	{ title: "pants", label: "下装", AucGenre: 3, AucSubType: 4 },
	{ title: "boots", label: "鞋子", AucGenre: 3, AucSubType: 5 },
	{ title: "amulet", label: "项链", AucGenre: 4, AucSubType: 1 },
	{ title: "pendant", label: "腰坠", AucGenre: 4, AucSubType: 3 },
	{ title: "ring_1", label: "戒指", AucGenre: 4, AucSubType: 2 },
	{ title: "ring_2", label: "戒指", AucGenre: 4, AucSubType: 2 },
];
export default {
	name: "plan",
	props: [],
	data: function () {
		return {
			visible: false,
			search: "",
			plan_index: -1,

			list: [],
			plan_item: "",
		};
	},
	computed: {
		id: function () {
			return this.$route.params.item_id;
		},
	},
	watch: {
		search(val) {
			this.searchPlans(val);
		},
		id: {
			immediate: true,
			handler: function (val) {
				this.getItem(val);
			},
		},
	},
	methods: {
		// 获取需要加入清单的物品信息
		getItem(ids) {
			searchItemsID({ ids }).then((res) => {
				let { id, UiID, Name, IconID, Quality, AucGenre, AucSubType, DescHtml, IsEquip } = res.data[0];
				this.plan_item = {
					id,
					UiID,
					Name,
					IconID,
					Quality,
					AucGenre,
					AucSubType,
					DescHtml,
					IsEquip,
					count: 1,
				};
			});
		},
		// 搜索清单
		searchPlans(val) {
			getMyPlans({ search: val }).then((res) => {
				this.list = res.list;
			});
		},
		// 打开我的清单列表，未登录则跳转登录页
		openPlans() {
			if (!User.isLogin()) return User.toLogin();
			getMyPlans({ page: 1, limit: 8 }).then((res) => {
				this.list = res.list;
			});
		},
		// 选择需要加入物品的清单 物品&武器
		changePlans(item, index) {
			if (this.plan_index !== -1 && this.plan_index == index) return (this.plan_index = -1);
			this.plan_index = index;
			item.type == 1 ? this.openItemPlan(item, index) : this.addEquipPlan(item.id);
		},
		// 获取物品子清单并展开清单
		openItemPlan(item, index) {
			if (this.list[index].relation) return;
			getItemPlanID(item.id).then((res) => {
				this.list.forEach((el, i) => {
					if (i == index) this.$set(el, "relation", res.relation);
				});
			});
		},
		// 加入武器清单
		addEquipPlan(id) {
			let type = this.equipType();
			getItemPlanID(id).then((res) => {
				let relation = res.relation;
				for (const key in relation) {
					if (key == type) {
						relation[key] = [...new Set(relation[key], this.id)];
					}
				}
				console.log(relation, '"???"');
			});
			// if (type) this.postPlan(id, { relation: { [type]: [this.plan_item] } });
		},
		// 判断装备的类型
		equipType() {
			if (!this.plan_item.IsEquip) return this.$message.error("该物品不是装备，无法添加至武器清单");
			let { AucGenre, AucSubType } = this.plan_item;
			let type = "";
			if (AucGenre == 1) {
				type = "melee_weapon";
			} else if (AucGenre == 2) {
				type = "range_weapon";
			} else {
				default_equip.forEach((el) => {
					if (el.AucGenre == AucGenre && el.AucSubType == AucSubType) {
						type = el.title;
					}
				});
			}
			return type;
		},
		// 加入物品清单
		addItemPlan(item, key) {
			console.log(this.plan_item);

			console.log(item, key);
		},
		// 提交清单
		postPlan(id, params) {
			postMyPlans(id, params)
				.then(() => {
					this.$message({
						message: "添加成功",
						type: "success",
					});
				})
				.finally(() => {
					this.visible = false;
				});
		},
	},
	created() {},
};
</script>
<style lang="less" scoped>
.w-plans {
	max-height: 800px;
	overflow-y: auto;
	.m-create {
		.x;
		padding: 10px 0;
		border-bottom: 1px solid #eee;
		.el-button {
			padding: 8px 20px;
		}
	}
	.m-list {
		.pt(10px);
	}

	.u-list {
		.fz(14px,2);
		.pointer;
		.u-title,
		.u-child {
			&:hover {
				color: #0366d6;
				text-decoration: underline;
			}
		}
		.has-child {
			&::after {
				content: "  ";
				.fr;
			}
		}

		.u-child {
			.pl(1em);
		}
		i {
			.mr(5px);
		}
	}
	.u-item .u-child:hover:before {
		content: " ✚ ";
		.fr;
	}
	.u-equip:hover:before {
		content: " ✚ ";
		.fr;
	}
}
</style>
<style>
.w-plans {
	z-index: 99 !important;
	width: 180px;
}
.m-item-icon-popup {
	padding: 0;
}
</style>
