<template>
	<div class="m-plan-equip" v-if="plan">
		<div class="u-equip" :class="'u-equip-' + label" v-for="(item, label) in equip" :key="label">
			<jx3-item-simple :item="item" :onlyIcon="true" iconSize="56px" :withName="true" />
		</div>
		<div class="u-info">
			<div class="u-title">{{ plan.title }}</div>
			<a class="u-author" :href="userpage" target="_blank">
				<img :src="avatar" class="u-author-avatar" />
				<span class="u-author-name">{{ plan.user_nickname }}</span>
			</a>
			<div class="u-time">
				<i class="el-icon-date"></i>
				{{ (plan.updated * 1000) | showTime }}
			</div>
			<div class="u-desc">{{ plan.description }}</div>
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
import EquipPosition from "../service/enum/EquipPosition";
import ItemSimple from "./ItemSimple";
import { authorLink } from "@jx3box/jx3box-common/js/utils";
import QRcode from "@jx3box/jx3box-common-ui/src/interact/QRcode.vue";
import { showTime } from "@jx3box/jx3box-common/js/moment.js";
import { get_plan } from "../service/item.js";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
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
	props: ["data", "id"],
	data: function () {
		return {
			plan_data: "",
		};
	},
	computed: {
		plan: function () {
			return this.id ? this.plan_data : this.data;
		},
		equip: function () {
			return {
				weapon_1: this.plan.relation_items[EquipPosition.MELEE_WEAPON][0],
				weapon_2: this.plan.relation_items[EquipPosition.RANGE_WEAPON][0],
				cap: this.plan.relation_items[EquipPosition.HELM][0],
				cloth: this.plan.relation_items[EquipPosition.CHEST][0],
				belt: this.plan.relation_items[EquipPosition.WAIST][0],
				wrist: this.plan.relation_items[EquipPosition.BANGLE][0],
				trousers: this.plan.relation_items[EquipPosition.PANTS][0],
				shoes: this.plan.relation_items[EquipPosition.BOOTS][0],
				necklace: this.plan.relation_items[EquipPosition.AMULET][0],
				pendant: this.plan.relation_items[EquipPosition.PENDANT][0],
				ring_1: this.plan.relation_items[EquipPosition.RING_1][0],
				ring_2: this.plan.relation_items[EquipPosition.RING_2][0],
			};
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
	methods: {},
	filters: {
		showTime,
	},
	mounted: function () {
		if (this.id) {
			get_plan(this.id).then((res) => {
				this.plan_data = res.data.data.plan;
			});
		}
	},
	components: {
		"jx3-item-simple": ItemSimple,
		QRcode,
	},
};
</script>

<style lang="less">
@import "../assets/css/components/equip.less";
</style>
