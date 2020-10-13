<template>
    <div class="m-cj-index">
        <Items :items="items" />
        <el-pagination
            background
            :total="total"
            hide-on-single-page
            layout="prev, pager, next"
            :current-page="page"
            :page-size="length"
            prev-html="&laquo;"
            next-html="&raquo;"
            @current-change="page_change_handle"
        ></el-pagination>
    </div>
</template>

<script>
import Items from "@/components/Items.vue";

const { JX3BOX } = require("@jx3box/jx3box-common");

export default {
    name: "Search",
    props: [],
    data: function() {
        return {
            items: [],
            total: 0,
            page: 1,
            length: 15,
        };
    },
    methods: {
        // 获取物品搜索列表
        get_items(ids, keyword, page, length) {
            let data = { ids: ids, keyword: keyword, page: page };
            if (typeof length !== "undefined") data["limit"] = length;
            return new Promise((resolve, reject) => {
                this.$http({
                    method: "GET",
                    url: `${JX3BOX.__helperUrl}api/item/search`,
                    headers: { Accept: "application/prs.helper.v2+json" },
                    params: data,
                    withCredentials: true,
                }).then(
                    function(data) {
                        data = data.data;
                        if (data.code === 200) {
                            resolve(data.data);
                        }
                    },
                    function() {
                        resolve(false);
                    }
                );
            });
        },
        page_change_handle(page) {
            this.$router.push({
                name: "search",
                params: { keyword: this.$route.params.keyword },
                query: { page: page },
            });
        },
    },
    mounted: function() {},
    components: {
        Items,
    },
    watch: {
        $route: {
            immediate: true,
            async handler() {
                this.page = parseInt(this.$route.query.page);
                let data = await this.get_items(
                    this.$route.query.ids ? this.$route.query.ids.split(',') : [],
                    this.$route.params.keyword,
                    this.page,
                    this.length
                );
                this.items = data.data;
                this.total = data.total;
            },
        },
    },
};
</script>
