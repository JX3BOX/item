<template>
    <div class="m-item-index m-item-normal">
        <ul style="margin:0;padding:15px;overflow:hidden;text-align:center;">
            <li v-for="(item,key) in items" :key="key" style="display:inline-block;width:120px;height:120px;padding:5px">
                <img class="u-icon" :src="$options.filters.icon_url(item.IconID)" :title="item.Name">
                <h6 class="u-name" v-text="item.Name" style="margin:0"></h6>
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
                genre: null,
                sub_type: null,
                detail_type: null,
            }
        },
        computed: {},
        methods: {
            get_items() {
                let params = {limit: 500};

                let genre = this.$route.params.Genre;
                let sub_type = this.$route.params.SubType;
                let detail_type = this.$route.params.DetailType;
                params.genre = this.genre = genre === 'empty' ? '' : genre;
                params.sub_type = this.sub_type = sub_type === 'empty' ? '' : sub_type;

                if (typeof detail_type !== 'undefined') {
                    params.detail_type = this.detail_type = detail_type === 'empty' ? '' : detail_type;
                }

                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/item/menu_list`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    params: params,
                    withCredentials: true
                }).then((data) => {
                    data = data.data;
                    if (data.code === 200) this.items = data.data.data;
                }, () => {
                    this.items = false;
                });
            },
        },
        mounted: function () {
        },
        watch: {
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