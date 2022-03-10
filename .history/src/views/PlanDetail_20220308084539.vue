<template>
	<div class="m-plan-view" v-loading="loading">
		<Wiki source_type="item" :source_id="item_id" :type="type" :id="id" title="宠物攻略"></Wiki>
	</div>
</template>
<script>
import Wiki from "@/components/Wiki.vue";
export default {
	name: "demo",
	props: [],
	components: {
		Wiki,
	},
	data: function () {
		return {
			loading: false,
		};
	},
	computed: {
        item_id(){
            return 1
        },
        type(){
            return 1
        }
    },
	watch: {},
	methods: {},
	created: function () {},
	mounted: function () {},
};
</script>
<style lang="less">
//@import '@/assets/css/demo.less';
</style>
