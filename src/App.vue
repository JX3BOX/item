<template>
	<div id="app">
		<Header></Header>
		<!-- 频道栏 -->
		<Breadcrumb name="物品百科" slug="item" :publishEnable="true" :feedbackEnable="true" :adminEnable="false">
			<ItemBreadcrumb />
		</Breadcrumb>
		<!-- 左侧菜单 -->
		<LeftSidebar>
			<Sidebar :sidebar="globalSidebar" />
		</LeftSidebar>
		<Main :withoutRight="false">
			<!-- 路由页面内容 -->
			<keep-alive include="PlanList">
				<router-view />
			</keep-alive>
			<!-- 右侧咨询 -->
			<RightSidebar>
				<Extend />
			</RightSidebar>
			<Footer></Footer>
		</Main>
	</div>
</template>

<script>
import ItemBreadcrumb from "@/components/ItemBreadcrumb.vue";
import Sidebar from "@/components/Sidebar.vue";
import Extend from "@/components/Extend.vue";
export default {
	name: "App",
	props: [],
	data: function () {
		return {};
	},
	computed: {
		globalSidebar() {
			return this.$store.state.sidebar;
		},
		query() {
			return this.$route.query;
		},
		params() {
			return this.$route.params;
		},
	},
	methods: {
	},
	mounted: function () {},
	components: {
		ItemBreadcrumb,
		Sidebar,
		Extend,
	},
	watch: {
		$route: {
			// immediate: true,
			handler() {
				let sidebar = {};
				if (typeof this.params.AucGenre === "undefined" && typeof this.params.AucSubTypeID === "undefined" && typeof this.query.auc_genre === "undefined" && typeof this.query.auc_sub_type_id === "undefined" && !this.params.item_id) {
					sidebar = { AucGenre: null, AucSubTypeID: null };
				} else {
					sidebar = {
						AucGenre: this.query.auc_genre || "",
						AucSubTypeID: this.query.auc_sub_type_id || "",
					};
					// 如存在路由参数，优先使用路由参数
					if (this.params.AucGenre) {
						sidebar = {
							AucGenre: this.params.AucGenre === "empty" ? "" : this.params.AucGenre,
							AucSubTypeID: this.params.AucSubTypeID || "",
						};
					}
				}
				this.$store.commit("SET_STATE", { key: "sidebar", value: sidebar });
			},
		},
	},
};
</script>
