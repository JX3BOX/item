<template>
	<div class="m-plan-equip" v-if="plan">
		<div class="u-equip" :class="'u-equip-' + label" v-for="(item, label) in plan.relation" :key="label">
			<itemIcon :item="item[0]" />
			<span class="u-name" :class="`quality-${item[0].Quality || '1'}`">{{ item[0].Name }}</span>
		</div>
		<div class="u-info">
			<div class="u-title">{{ plan.title }}</div>
			<a class="u-author" :href="userpage" target="_blank">
				<img :src="avatar" class="u-author-avatar" />
				<span class="u-author-name">{{ plan.user_nickname }}</span>
			</a>
			<div class="u-time">
				<i class="el-icon-date"></i>
				{{ showTime(plan.updated * 1000) }}
			</div>
			<div class="u-qrcodebox">
				<QRcode :href="link" :s="120" v="static" />
			</div>
		</div>
		<div class="u-misc">
			<a class="u-logo" :href="link" target="_blank">
				<img svg-inline src="../assets/img/jx3box.svg" />
				<span>配装ID:{{ plan.id }}</span>
			</a>
		</div>
	</div>
</template>

<script>
import QRcode from "@jx3box/jx3box-common-ui/src/interact/QRcode.vue";
import itemIcon from "@/components/ItemIcon.vue";
import { authorLink } from "@jx3box/jx3box-common/js/utils";
import { showTime } from "@jx3box/jx3box-common/js/moment.js";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
	name: "equip",
	props: ["data"],
	data: function () {
		return {
			plan_data: "",
		};
	},
	computed: {
		plan: function () {
			return this.id ? this.plan_data : this.data;
		},

		avatar: function () {
			return this.plan ? this.plan.user_avatar : "";
		},
		username: function () {
			return this.plan ? this.plan.user_nickname : "";
		},
		uid: function () {
			return this.plan ? this.plan.user_id : "";
		},
		userpage: function () {
			return this.uid ? authorLink(this.uid) : "";
		},
		link: function () {
			return this.plan ? __Root + `item/#/plan_view/${this.plan.id}` : "";
		},
	},
	methods: {
		showTime,
        cs
	},
	components: {
		itemIcon,
		QRcode,
	},
};
</script>

<style lang="less">
@import "../assets/css/components/equip.less";
</style>
