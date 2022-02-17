<template>
	<div id="m-item-view">
		<Search />
		<div v-if="wiki_post.source && JSON.stringify(wiki_post.source) !== '{}'" class="w-item">
			<div class="m-item-viewer">
				<div class="w-left">
					<jx3-item :item_id="wiki_post.source.id" />
				</div>
				<div class="w-right">
					<div class="m-name">
						<item-icon :item="wiki_post.source" :dishoverable="true" />
						<h6
							class="u-name"
							:class="{ white: wiki_post.source.Quality == 1 }"
							v-text="wiki_post.source.Name"
							:style="{
								color: item_color(wiki_post.source.Quality),
							}"
						></h6>
						<div class="m-buttons fr">
							<!-- 加入清单 -->
							<!-- <el-popover class="u-plansBox" placement="bottom" width="160" v-model="addPlans" trigger="manual">
								<div class="u-myPlans" v-for="(item, index) in myPlansList" :key="index" @click="addMyPlans(item)">
									<i class="el-icon-caret-right"></i>
									<span>{{ item.title }}</span>
								</div> -->
								<el-button type="success" size="mini" plain class="u-add-to-item-list" slot="reference" disabled>
									<i class="u-el-icon el-icon-shopping-cart-full"></i>
									<span class="u-text">加入清单</span>
								</el-button>
							<!-- </el-popover> -->
							<!-- 收藏按钮 -->
							<Fav class="u-collect" post-type="item" :post-id="wiki_post.source.id" />
						</div>
					</div>
					<!-- 其余属性 -->
					<ul class="m-other-fields">
						<li v-if="wiki_post.source.Price">
							<span class="u-label">回购价格</span>
                            <GamePrice class="u-value" :price="wiki_post.source.Price" />
							<!-- <span class="u-value" v-text="item_price(wiki_post.source.Price)"></span> -->
						</li>
						<li v-if="wiki_post.source.Level">
							<span class="u-label">品质等级</span>
							<span class="u-value" v-text="wiki_post.source.Level"></span>
						</li>
						<li class="m-other-field">
							<span class="u-label">绑定</span>
							<span class="u-value" v-text="item_bind(wiki_post.source.BindType)"></span>
						</li>
						<!--<li v-if="wiki_post.source.Require1Type">
                            <label class="u-title" v-text="item_require_1_type(wiki_post.source.Require1Type) + '：'"></label>
                            <span class="u-value" v-text="wiki_post.source.Require1Value"></span>
                        </li>-->
						<li v-if="wiki_post.source.AucGenre >= 1 && wiki_post.source.AucGenre <= 3">
							<span class="u-label">耐久度</span>
							<span class="u-value" v-text="`${wiki_post.source.MaxDurability}/${wiki_post.source.MaxDurability}`"></span>
						</li>
						<!--<li class="m-field">
                            <label class="u-title">磨损率：</label>
                            <span class="u-value" v-text="wiki_post.source.AbradeRate"></span>
                        </li>-->
						<li v-if="wiki_post.source.MaxExistTime > 0">
							<span class="u-label">存放时间</span>
							<span class="u-value" v-text="wiki_post.source.MaxExistTime"></span>
						</li>
						<li v-if="wiki_post.source.MaxExistAmount > 0">
							<span class="u-label">最大拥有数</span>
							<span class="u-value" v-text="wiki_post.source.MaxExistAmount"></span>
						</li>
						<li class="m-other-field">
							<span class="u-label">可否交易</span>
							<span class="u-value" v-text="wiki_post.source.CanTrade ? '可交易' : '不可交易'"></span>
						</li>
						<!--<li class="m-other-field">
                            <label class="u-title">能否丢弃：</label>
                            <span class="u-value" v-text="wiki_post.source.CanDestroy || wiki_post.source.CanDestroy === null? '✔️': '❌'"></span>
                        </li>-->
						<li class="m-other-field">
							<span class="u-label">品质</span>
							<span class="u-value" v-html="`<span style='color:${item_color(wiki_post.source.Quality)}'>${item_quality(wiki_post.source.Quality)}</span>`"></span>
						</li>
						<li v-if="wiki_post.source.BelongSchool">
							<span class="u-label">门派</span>
							<span class="u-value" v-text="wiki_post.source.BelongSchool"></span>
						</li>
						<li v-if="wiki_post.source.MagicKind">
							<span class="u-label">心法</span>
							<span class="u-value" v-text="wiki_post.source.MagicKind"></span>
						</li>
						<li v-if="wiki_post.source.MagicType">
							<span class="u-label">属性</span>
							<span class="u-value" v-text="wiki_post.source.MagicType"></span>
						</li>
						<li v-if="wiki_post.source.GetType">
							<span class="u-label">获得途径</span>
							<span class="u-value" v-text="wiki_post.source.GetType"></span>
						</li>
						<li v-if="wiki_post.source.CanSetColor">
							<span class="u-label">可以改色</span>
							<span class="u-value">是</span>
						</li>
						<li v-if="wiki_post.source.Requires && wiki_post.source.Requires[100]">
							<span class="u-value" v-text="wiki_post.source.Requires[100]"></span>
						</li>
						<li class="m-other-field">
							<span class="u-label">可否分解</span>
							<span class="u-value" v-text="wiki_post.source.CanApart ? '可以' : '不可以'"></span>
						</li>
						<li v-if="wiki_post.source.CanExterior">
							<span class="u-label">可否收集</span>
							<span class="u-value" v-text="'可以收集'"></span>
						</li>
						<!--<li class="m-other-field">
                            <label class="u-title">能否附魔：</label>
                            <span class="u-value" v-text="wiki_post.source.CanChangeMagic"></span>
                        </li>-->
						<li v-if="wiki_post.source.CanShared">
							<span class="u-label">可否分享</span>
							<span class="u-value" v-text="'可以分享'"></span>
						</li>
						<!--<li class="m-other-field">
                            <label class="u-title">修理费：</label>
                            <span class="u-value" v-text="wiki_post.source.RepairPriceRebate"></span>
                        </li>-->
						<li class="m-other-field">
							<span class="u-label">可否堆叠</span>
							<span class="u-value" v-text="wiki_post.source.CanStack ? '可以' : '不可以'"></span>
						</li>
						<li v-if="wiki_post.source.CanConsume">
							<span class="u-label">消耗品</span>
							<span class="u-value" v-text="'是'"></span>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="m-tabs">
			<div class="m-price-server">
				<i class="el-icon-s-shop"></i> 全服价格
				<el-select v-if="activeTab === 'item-price-chart' || activeTab === 'item-prices'" class="u-server" v-model="server" placeholder="请选择服务器" size="mini">
					<el-option key label="前五低价区服" value v-if="isStdClient"></el-option>
					<el-option v-for="serve in servers" :key="serve" :label="serve" :value="serve"></el-option>
				</el-select>
			</div>

			<el-tabs v-model="activeTab" type="border-card" @tab-click="active_tab_handle" v-loading="loading">
				<el-tab-pane label="📈 价格波动" name="item-price-chart" v-if="wiki_post.source && wiki_post.source.BindType != 3">
					<item-price-chart ref="item_price_chart" :item_id="wiki_post.source.id" :server="server" />
				</el-tab-pane>
				<el-tab-pane label="💰 近期价格" name="item-prices" v-if="wiki_post.source && wiki_post.source.BindType != 3">
					<item-prices :item_id="wiki_post.source.id" :server="server" />
				</el-tab-pane>
				<el-tab-pane label="📜 相关物品清单" name="relation-plans">
					<relation-plans :item_id="wiki_post.source.id" />
				</el-tab-pane>
			</el-tabs>
		</div>

        <div class="m-wiki-post-panel" v-if="wiki_post && wiki_post.post">
            <WikiPanel :wiki-post="wiki_post">
                <template slot="head-title">
                    <img class="u-icon" svg-inline src="../assets/img/item.svg" />
                    <span class="u-txt">物品攻略</span>
                </template>
                <template slot="head-actions">
                    <a class="el-button el-button--primary" :href="publish_url(`item/${id}`)">
                        <i class="el-icon-edit"></i>
                        <span>完善物品攻略</span>
                    </a>
                </template>
                <template slot="body">
                    <div class="m-wiki-compatible" v-if="compatible">
                        <i class="el-icon-warning-outline"></i> 暂无怀旧服攻略，以下为正式服攻略，仅作参考，<a class="s-link" :href="publish_url(`item/${id}`)">参与修订</a>。
                    </div>
                    <Article :content="wiki_post.post.content" />
                    <div class="m-wiki-signature">
                        <i class="el-icon-edit"></i>
                        本次修订由 <b>{{ user_name }}</b> 提交于{{ updated_at }}
                    </div>
                    <Thx class="m-thx" :postId="id" postType="item" :userId="author_id" :adminBoxcoinEnable="isRevision" :userBoxcoinEnable="isRevision" mode="wiki" :key="'item-thx-' + id"/>
                </template>
            </WikiPanel>

			<!-- 历史版本 -->
			<WikiRevisions type="item" :source-id="id" />

			<!-- 百科评论 -->
			<WikiComments type="item" :source-id="id" />
		</div>
		<div class="m-wiki-post-empty" v-else>
			<i class="el-icon-s-opportunity"></i>
			<span>暂无攻略，我要</span>
			<a class="s-link" :href="publish_url(`item/${id}`)">完善攻略</a>
		</div>
	</div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Fav from "@jx3box/jx3box-common-ui/src/interact/Fav.vue";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
import ItemIcon from "@/components/ItemIcon.vue";
import WikiPanel from "@jx3box/jx3box-common-ui/src/wiki/WikiPanel";
import WikiRevisions from "@jx3box/jx3box-common-ui/src/wiki/WikiRevisions";
import WikiComments from "@jx3box/jx3box-common-ui/src/wiki/WikiComments";
import Search from "@/components/Search.vue";
import RelationPlans from "@/components/RelationPlans.vue";
import ItemPrices from "@/components/ItemPrices.vue";
import ItemPriceChart from "@/components/ItemPriceChart.vue";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { WikiPost } from "@jx3box/jx3box-common/js/helper";
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
import std_servers from "@jx3box/jx3box-data/data/server/server_std.json";
import origin_servers from "@jx3box/jx3box-data/data/server/server_origin.json";
import { item_color, item_quality, item_price, item_bind } from "../filters";
import { publishLink, ts2str, showAvatar } from "@jx3box/jx3box-common/js/utils";
import User from "@jx3box/jx3box-common/js/user.js";
import { get_my_item_plans, save_item_plan } from "@/service/item_plan.js";
import GamePrice from '@jx3box/jx3box-common-ui/src/wiki/GamePrice.vue'
export default {
	name: "Detail",
	props: [],
	data: function () {
		return {
			wiki_post: {
				source: {},
				post: null,
			},
			compatible: false,
			is_empty: true,

            server: "",
            activeTab: "item-price-chart",
            loading: false,
        };
    },
    computed: {
        id: function() {
            return this.$route.params.item_id;
        },
        post_id: function() {
            return this.$route.params.post_id;
        },
        isRevision: function() {
            return !!this.$route.params.post_id;
        },
        author_id: function() {
            return ~~this.wiki_post?.post?.user_id;
        },
        servers: function() {
            return this.$store.state.client == "origin" ? origin_servers : std_servers;
        },
        isStdClient: function() {
            return this.$store.state.client == "std";
        },
        client: function() {
            return this.$store.state.client;
        },
        user_name: function() {
            return this.wiki_post?.post?.user_nickname;
        },
        updated_at: function() {
            return ts2str(this.wiki_post?.post?.updated);
        },
    },
    components: {
        "jx3-item": Item,
        ItemIcon,
        WikiPanel,
        WikiRevisions,
        WikiComments,
        Article,
        Search,
        Fav,
        "relation-plans": RelationPlans,
        "item-prices": ItemPrices,
        "item-price-chart": ItemPriceChart,
        GamePrice,
    },
    methods: {
        active_tab_handle(tab) {
            if (tab.name === "item-price-chart") {
                this.$nextTick(() => {
                    this.$refs.item_price_chart.render();
                });
            }
        },
        go_to_comment() {
            let target = document.querySelector("#m-reply-form");
            target.scrollIntoView(true);
        },
        publish_url: publishLink,
        item_color,
        item_quality,
        item_price,
        item_bind,
        ts2str,
        showAvatar: function(url) {
            return showAvatar(url, 32);
        },
        loadData: function() {
            // 获取最新攻略
            if (this.id) {
                if (this.client == "std") {
                    WikiPost.newest("item", this.id, 1, "std").then((res) => {
                        let data = res?.data?.data;
                        this.wiki_post = data;
                        if (data) {
                            this.is_empty = false;
                        }
                        console.log("获取正式服攻略");
                    });
                } else {
                    WikiPost.newest("item", this.id, 1, "origin")
                        .then((res) => {
                            let data = res?.data?.data;
                            this.wiki_post = data;
                            if (data) {
                                this.is_empty = false;
                            }
                            console.log("获取怀旧服攻略");
                            return !!data.post;
                        })
                        .then((data) => {
                            if (!data) {
                                console.log("兼容：获取正式服攻略");
                                WikiPost.newest("item", this.id, 1, "std").then((res) => {
                                    let data = res?.data?.data;
                                    this.wiki_post = data;
                                    if (data) {
                                        this.is_empty = false;
                                    }
                                    this.compatible = true;
                                });
                            }
                        });
                }
            }
            this.triggerStat();
        },
        loadRevision: function() {
            // 获取指定攻略
            WikiPost.view(this.post_id, { type: "item" }).then((res) => {
                this.wiki_post = res?.data?.data;
            });
            this.triggerStat();
        },
        triggerStat: function() {
            if (this.client == "origin") {
                postStat("origin_item", this.id);
            } else {
                postStat("item", this.id);
            }
        },
    },
    watch: {
        id: {
            handler() {
                this.loadData();
            },
        },
        post_id: {
            handler() {
                this.loadRevision();
            },
        },
        "wiki_post.source": {
            immediate: true,
            deep: true,
            handler() {
                let item = this.wiki_post.source;
                this.activeTab = item && item.BindType != 3 ? "item-price-chart" : "relation-plans";
                this.$store.state.sidebar.AucGenre = parseInt(item.AucGenre);
                this.$store.state.sidebar.AucSubTypeID = parseInt(item.AucSubTypeID);
            },
        },
    },
    mounted: function() {
        if (this.post_id) {
            this.loadRevision();
        } else {
            this.loadData();
        }
    },
    created() {
        if (this.$store.state.client == "origin") {
            this.server = "缘起稻香";
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/views/detail.less";
</style>
