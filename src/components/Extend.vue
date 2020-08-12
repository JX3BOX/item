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
                <img class="u-icon" svg-inline src="../assets/img/rank.svg" />
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
                            let rank = ranks[items[i].ID];
                            items[i].rank = rank;
                        }
                        // 按照长度分批
                        this.hot_items = this.chuck(items);
                    }
                });
            });

            let ranks = {
                164384: {"30days": 204, "7days": 26, "yesterday": 2},
                164506: {"30days": 101, "7days": 24, "yesterday": 3},
                160116: {"30days": 36, "7days": 24, "today": 3, "yesterday": 4},
                143452: {"30days": 38, "7days": 15, "yesterday": 2},
                158246: {"30days": 16, "7days": 13, "today": 3, "yesterday": 2},
                143416: {"30days": 45, "7days": 12, "yesterday": 2},
                160306: {"30days": 30, "7days": 11, "yesterday": 0},
                162020: {"30days": 9, "7days": 9, "yesterday": 0},
                158497: {"30days": 8, "7days": 8, "yesterday": 0},
                159379: {"30days": 7, "7days": 7, "yesterday": 0},
                161941: {"30days": 7, "7days": 7, "yesterday": 0},
                152525: {"30days": 7, "7days": 7, "yesterday": 0},
                153192: {"30days": 6, "7days": 6, "yesterday": 0},
                159012: {"30days": 6, "7days": 6, "yesterday": 0},
                154662: {"30days": 5, "7days": 5, "yesterday": 0},
                164523: {"30days": 2, "7days": 2, "yesterday": 2},
                164505: {"30days": 17, "7days": 2, "yesterday": 2},
                143586: {"30days": 2, "7days": 2, "yesterday": 2},
                164385: {"30days": 38, "7days": 2, "yesterday": 2},
                117015: {"30days": 1, "7days": 1, "yesterday": 1}
            };
            get_items({ids: [164384,164506,160116,143452,158246,143416,160306,162020,158497,159379,161941,152525,153192,159012,154662,164523,164505,143586,164385,117015], limit: 15})
                .then((data) => {
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

            this.checkIsHome()
        },
    };
</script>

<style lang="less">
    @import '../assets/css/components/extend.less';
</style>
