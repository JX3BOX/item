<template>
    <div class="m-item-index m-item-home">
        <ul style="margin:0;padding:15px;list-style:none;overflow:hidden;text-align:center;">
            <li v-for="(item,key) in items" :key="key" style="float:left;width:120px;height:120px;padding:5px">
                <img :src="icon_url_filter(item.IconID)" :title="item.Name">
                <h6 v-text="item.Name" style="margin:0;"></h6>
            </li>
        </ul>
    </div>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: 'Normal',
        props: [],
        data: function () {
            return {
                items: null,
                sub_type: null,
                detail_type: null,
            }
        },
        computed: {},
        methods: {
            get_items() {
                let sub_type = this.$route.params.SubType;
                let detail_type = this.$route.params.DetailType;
                this.sub_type = sub_type === 'empty' ? '' : sub_type;
                if (typeof detail_type !== 'undefined') this.detail_type = detail_type === 'empty' ? '' : detail_type;

                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/item/menu_list`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    params: {sub_type: this.sub_type, detail_type: this.detail_type, limit: 500},
                    withCredentials: true
                }).then((data) => {
                    data = data.data;
                    if (data.code === 200) this.items = data.data.data;
                }, () => {
                    this.items = false;
                });
            },
            // 图标过滤
            icon_url_filter(icon_id) {
                if (isNaN(parseInt(icon_id))) {
                    return `${JX3BOX.__imgPath}image/common/nullicon.png`;
                } else {
                    return `${JX3BOX.__iconPath}icon/${icon_id}.png`;
                }
            },
        },
        mounted: function () {
            this.get_items();
        },
        watch:{
            $route: {
                immediate: true,
                handler() {
                    this.get_items();
                }
            }
        }
    }
</script>

<style lang="less">

</style>