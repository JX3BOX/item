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
				<span class="u-plan-title"> {{ plan.title }} </span>
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
				<!-- 内容备注 -->
				<div class="m-description m-border">
					<div class="u-title">备注:</div>
					<div class="u-desc">{{ plan.description || "作者很懒什么也没写 😜" }}</div>
					<span class="u-user">
						<img class="u-avatar" :src="showAvatar(plan.user_avatar)" :alt="plan.user_nickname" />
						<a class="u-name" :href="authorLink(plan.user_id)">{{ plan.user_nickname || "匿名" }}</a>
						<span class="u-time">最后更新于 <i class="el-icon-time"></i>{{ date_format(plan.updated) }}</span>
					</span>
				</div>
				<!-- 物品 -->
				<div class="m-plan-item" v-if="plan.type == '1'">
					<div class="m-border" v-for="(item, index) in plan.relation" :key="index">
						<div class="u-title" v-if="item.title">{{ item.title }}</div>
						<div class="u-content">
							<router-link class="u-item" v-for="(el, key) in item.data" :key="key" :to="{ name: 'view', params: { item_id: el.id } }">
								<span class="u-img">
									<itemIcon :item="el" />
									<span class="u-count">{{ el.count }}</span>
								</span>
								<span class="u-name" :class="`quality-${el.Quality}`"> {{ el.Name }}</span>
							</router-link>
						</div>
					</div>
				</div>
				<!-- 装备 -->
				<div class="m-border m-plan-equips" v-else-if="plan.type == '2'">
					<Equip :data="plan" />
					<div class="u-content">
						<div class="u-list" v-for="(list, index) in equipList" :key="index">
							<div class="u-item" v-for="(item, key) in list" :key="key">
								<span class="u-title"> {{ item.label }}</span>
								<template v-if="item.list.length">
									<jx3-item-simple class="u-equip" v-for="eq in item.list" :key="eq.id" :item="eq" />
								</template>
								<div v-else class="u-equip">暂无物品</div>
							</div>
						</div>
					</div>
				</div>
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
import { getItemPlanID, delItemPlans, searchItemsID } from "../service/item_plan.js";
import itemIcon from "@/components/ItemIcon.vue";
import Equip from "@/components/Equip.vue";
import ItemSimple from "@jx3box/jx3box-editor/src/ItemSimple";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import Comment from "@jx3box/jx3box-comment-ui/src/Comment.vue";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { showAvatar, authorLink, ts2str } from "@jx3box/jx3box-common/js/utils";

export default {
	name: "demo",
	props: [],
	components: { Comment, WikiPanel, itemIcon, Equip, "jx3-item-simple": ItemSimple },
	data: function () {
		return {
			loading: false,

			isAuthor: true,
			plan: "",
			date_format: ts2str,

			equipList: [
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
			],
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
	watch: {
		plan(val) {
			if (val) this.converted(val);
		},
	},
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
		// 转换数据,获取旧数据id
		// TODO:新数据格式不转换，直接显示
		converted(data) {
			let { type, relation } = data;
			let _arr = [];
			if (!type) return;
			if (type == 1) {
                console.log(relation,'?')
				relation.forEach((list) => {
					list.data.forEach((el) => {
						if (typeof el == "string") _arr.push(el);
					});
				});
			} else {
				let _eq = Object.values(relation);
				_eq = _eq.filter((el) => el.length);
				if (typeof _eq[0][0] == "object") {
					this.equipGroup();
				} else {
					console.log(_eq);
					// 处理装备
					let _obj = Object.values(relation);
					_obj.forEach((el) => {
						el.forEach((item) => {
							if (typeof item == "string") _arr.push(item);
						});
					});
				}
				_arr = [...new Set(_arr)];
				if (_arr.length) this.getConverted(_arr);
			}
		},
		// 根据旧数据id获得物品信息
		getConverted(ids) {
			searchItemsID({ ids, limit: ids.length }).then((res) => {
				let cache_data = res.data.map((item) => {
					let { id, Name, DescHtml, UiID, IconID, Quality, AucGenre, AucSubType } = item;
					return { count: item.count || 1, Name, id, DescHtml, UiID, IconID, Quality, AucGenre, AucSubType };
				});
				let { type, relation } = this.plan;
				if (type == 1) {
					relation.map((list) => {
						list.data = list.data.map((item) => {
							item = cache_data.filter((el) => {
								return el.id == item;
							});
							return item[0];
						});
						return list;
					});
				} else {
					for (const key in relation) {
						relation[key] = relation[key].map((item) => {
							item = cache_data.filter((el) => {
								return el.id == item;
							});
							return item[0];
						});
					}
				}
				this.plan.relation = relation;
				this.equipGroup();
			});
		},
		// 将装备分组
		equipGroup(_obj = this.plan.relation) {
			this.equipList.map((list) => {
				list.map((el) => {
					if (_obj.hasOwnProperty(el.title)) {
						el.list = _obj[el.title];
					}
				});
			});
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
		iconLink,
		showAvatar,
		authorLink,
	},
	created: function () {
		this.getItemData();
	},
};
</script>
<style lang="less" scoped>
@import "../assets/css/views/plan_detail.less";
</style>
<style lang="less">
.v-plan-view .m-item-icon {
	.u-item-icon {
		.size(48px);
		max-height: 48px;
		.z(0);
	}
	.u-border {
		.z(1);
	}
	.u-border-quest {
		.z(2);
	}
}
</style>
