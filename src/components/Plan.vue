<template>
	<el-popover popper-class="w-plans" placement="bottom" trigger="click" v-model="visible">
		<el-input class="u-input" v-model.lazy="search" placeholder="请输入清单关键字"></el-input>
		<span class="u-list-null"> {{ list.length ? "点击清单添加物品" : "暂无清单" }}</span>
		<template v-if="list.length">
			<div class="u-list" v-for="(item, index) in list" :key="index" @click="addPlans(item.id)">
				<i class="el-icon-s-order"></i>
				<span>{{ item.title }}</span>
			</div>
		</template>
		<a v-else :href="publishLink(`item_plan`)" target="_blank" class="el-button u-create"><i class="el-icon-document-add"></i> <span>创建新清单</span></a>

		<el-button size="mini" type="success" slot="reference" @click="openPlans"><i class="u-el-icon el-icon-shopping-cart-full"></i> 加入清单</el-button>
	</el-popover>
</template>
<script>
import User from "@jx3box/jx3box-common/js/user";
import { publishLink } from "@jx3box/jx3box-common/js/utils";
import { getMyPlans, postMyPlans } from "../service/item_plan.js";
export default {
	name: "plan",
	props: [],
	data: function () {
		return {
			visible: false,
			search: "",
			list: [],
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
	},
	methods: {
		publishLink,
		openPlans() {
			if (!User.isLogin()) User.toLogin();

			getMyPlans({ page: 1, limit: 8 }).then((res) => {
				this.list = res.list;
			});
		},
		addPlans(id) {
			postMyPlans(id, { addPlan: this.id }).finally(() => {
				this.visible = false;
			});
		},
		searchPlans(val) {
			getMyPlans({ search: val }).then((res) => {
				this.list = res.list;
			});
		},
	},
};
</script>
<style lang="less" scoped>
.w-plans {
	.u-create {
		.db;
		.auto(x);
		padding: 8px 20px;
	}
	.u-list-null {
		.db;
		.x;
		.mb(10px);
		.fz(14px,3);
		border-bottom: 1px solid #eee;
	}
	.u-list {
		.fz(14px,2);
		.pointer;
		i {
			.mr(5px);
		}
		&:hover {
			color: #0366d6;
			text-decoration: underline;
			&::after {
				content: " ✚ ";
				.fr;
				// transform:rotate(180deg);
			}
		}
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
