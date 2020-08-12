<template>
    <div class="m-extend" :class="{isHome : isHome}">
        <!-- <ins
            class="adsbygoogle"
            style="display:block;width:100%;overflow:hidden;"
            data-ad-client="ca-pub-4388499329141185"
            data-ad-slot="9773281887"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins> -->
        <RightSideMsg>
            <em>官方反馈交流Q群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=5S50j08">614370825</a>
            </strong>
        </RightSideMsg>
        <div class="m-hot-items">
            <h3 class="c-sidebar-right-title">
                <img class="u-icon" svg-inline src="../assets/img/rank.svg"/>
                <span>热门物品</span>
            </h3>
            <router-link class="m-hot-item" v-for="(item, key) in hot_items" :key="key"
                         :to="{name:'view', params: {item_id: item.UiID}}">
                <div class="u-icon">
                    <img @error.once="img_error_handle" :src="$options.filters.icon_url(item.IconID)">
                </div>
                <div class="m-content">
                    <span class="u-title" :style="{color:$options.filters.item_color(item.Quality)}">
                        <i class="el-icon-medal"></i>
                        <span v-text="` ${item.Name}`"></span>
                    </span>
                    <span class="u-desc" v-html="` ${item.DescHtml}`"></span>
                    <span class="u-rank" v-if="item.rank">
                        <i class="el-icon-grape"></i>
                        <span v-text="`七天 - ${item.rank['7days']}`"></span>
                        <i class="el-icon-pear"></i>
                        <span v-text="`三十天 - ${item.rank['30days']}`"></span>
                    </span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    const {JX3BOX} = require("@jx3box/jx3box-common");
    import {getRank} from "../service/stat.js";
    import {get_items} from "../service/item.js";

    export default {
        name: "Extend",
        props: [],
        data: function () {
            return {
                isHome: true,
                hot_items: null,
            };
        },
        computed: {},
        methods: {
            checkIsHome: function () {
                this.isHome = this.$route.name == 'home' || !this.$route.name
            },
            chuck(arr, number = 3) {
                let output = [];
                for (let i = 0; i < arr.length; i += number) {
                    output.push(arr.slice(i, i + number))
                }
                return output;
            },
            img_error_handle(e) {
                e.target.src = `${JX3BOX.__ossRoot}image/common/nullicon.png`;
            },
        },
        watch: {
            '$route.name': function (newpath) {
                this.checkIsHome()
            }
        },
        mounted: function () {
            // 获取热门物品
            getRank().then((data) => {
                data = data.data;

                let ranks = [],
                    item_ids = [];
                for (let i in data) {
                    let name = this.$_.get(data, `${i}.name`, '-');
                    let achievement_id = this.$_.get(name.split('-'), 1, '');
                    if (achievement_id) {
                        item_ids.push(achievement_id);
                        ranks[achievement_id] = this.$_.get(data, `${i}.value`, {});
                    }
                }

                get_items({ids: item_ids, limit: 15}).then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        let items = data.data.data;
                        for (let i in items) {
                            let rank = ranks[items[i].UiID];
                            items[i].rank = rank;
                        }
                        this.hot_items = items;
                    }
                });
            });

            this.checkIsHome();
        },
    };
</script>

<style lang="less">
    @import '../assets/css/components/extend.less';
</style>
