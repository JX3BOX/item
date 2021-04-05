<template>
    <div id="m-item-view">
        <Search />
        <div v-if="item && JSON.stringify(item) !== '{}'" class="w-item">
            <div class="m-item-viewer">
                <div class="w-left">
                    <jx3-item :item="item" />
                </div>
                <div class="w-right">
                    <div class="m-name">
                        <item-icon :item="item" :dishoverable="true" />
                        <h6
                            class="u-name"
                            :class="{ white: item.Quality == 1 }"
                            v-text="item.Name"
                            :style="{
                                color: $options.filters.item_color(
                                    item.Quality
                                ),
                            }"
                        ></h6>
                        <div class="m-buttons fr">
                            <!-- 收藏按钮 -->
                            <Fav
                                class="u-collect"
                                post-type="item"
                                :post-id="item.id"
                            />
                            <!-- 加入清单 -->
                            <!--<el-button type="success" size="small" class="u-add-to-item-list" disabled>
                <i class="u-el-icon el-icon-shopping-cart-full"></i>
                <span class="u-text">加入清单</span>
              </el-button>-->
                        </div>
                    </div>
                    <!-- 其余属性 -->
                    <ul class="m-other-fields">
                        <li v-if="item.Price">
                            <span
                                class="u-value"
                                v-text="
                                    '回购价格 ' +
                                        $options.filters.item_price(item.Price)
                                "
                            ></span>
                        </li>
                        <li v-if="item.Level">
                            <span
                                class="u-value"
                                v-text="'品质等级' + item.Level"
                            ></span>
                        </li>
                        <li class="m-other-field">
                            <span
                                class="u-value"
                                v-text="
                                    $options.filters.item_bind(item.BindType)
                                "
                            ></span>
                        </li>
                        <!--<li v-if="item.Require1Type">
            <label class="u-title" v-text="$options.filters.item_require_1_type(item.Require1Type) + '：'"></label>
            <span class="u-value" v-text="item.Require1Value"></span>
            </li>-->
                        <li v-if="item.AucGenre >= 1 && item.AucGenre <= 3">
                            <span
                                class="u-value"
                                v-text="
                                    `耐久度 ${item.MaxDurability}/${item.MaxDurability}`
                                "
                            ></span>
                        </li>
                        <!--<li class="m-field">
            <label class="u-title">磨损率：</label>
            <span class="u-value" v-text="item.AbradeRate"></span>
            </li>-->
                        <li v-if="item.MaxExistTime > 0">
                            <span
                                class="u-value"
                                v-text="'存放时间：' + item.MaxExistTime"
                            ></span>
                        </li>
                        <li v-if="item.MaxExistAmount > 0">
                            <span
                                class="u-value"
                                v-text="'最大拥有数' + item.MaxExistAmount"
                            ></span>
                        </li>
                        <li class="m-other-field">
                            <span
                                class="u-value"
                                v-text="item.CanTrade ? '可交易' : '不可交易'"
                            ></span>
                        </li>
                        <!--<li class="m-other-field">
            <label class="u-title">能否丢弃：</label>
            <span class="u-value" v-text="item.CanDestroy || item.CanDestroy === null? '✔️': '❌'"></span>
            </li>-->
                        <li class="m-other-field">
                            <span
                                class="u-value"
                                v-html="
                                    `品质 <span style='color:${$options.filters.item_color(
                                        item.Quality
                                    )}'>${$options.filters.item_quality(
                                        item.Quality
                                    )}</span>`
                                "
                            ></span>
                        </li>
                        <li v-if="item.BelongSchool">
                            <span
                                class="u-value"
                                v-text="'门派 ' + item.BelongSchool"
                            ></span>
                        </li>
                        <li v-if="item.MagicKind">
                            <span
                                class="u-value"
                                v-text="'心法 ' + item.MagicKind"
                            ></span>
                        </li>
                        <li v-if="item.MagicType">
                            <span
                                class="u-value"
                                v-text="'属性 ' + item.MagicType"
                            ></span>
                        </li>
                        <li v-if="item.GetType">
                            <span
                                class="u-value"
                                v-text="'获得途径 ' + item.GetType"
                            ></span>
                        </li>
                        <li v-if="item.CanSetColor">
                            <span class="u-value" v-text="'可以改色'"></span>
                        </li>
                        <li v-if="item.Requires && item.Requires[100]">
                            <span
                                class="u-value"
                                v-text="item.Requires[100]"
                            ></span>
                        </li>
                        <li class="m-other-field">
                            <span
                                class="u-value"
                                v-text="item.CanApart ? '可以分解' : '不可分解'"
                            ></span>
                        </li>
                        <li v-if="item.CanExterior">
                            <span class="u-value" v-text="'可以收集'"></span>
                        </li>
                        <!--<li class="m-other-field">
            <label class="u-title">能否附魔：</label>
            <span class="u-value" v-text="item.CanChangeMagic"></span>
            </li>-->
                        <li v-if="item.CanShared">
                            <span class="u-value" v-text="'可以分享'"></span>
                        </li>
                        <!--<li class="m-other-field">
             <label class="u-title">修理费：</label>
             <span class="u-value" v-text="item.RepairPriceRebate"></span>
            </li>-->
                        <li class="m-other-field">
                            <span
                                class="u-value"
                                v-text="item.CanStack ? '可以堆叠' : '不可堆叠'"
                            ></span>
                        </li>
                        <li v-if="item.CanConsume">
                            <span class="u-value" v-text="'消耗品'"></span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <relation-plans :item_id="item.id" />

        <div class="w-post">
            <div
                v-if="post && JSON.stringify(post) === '{}'"
                class="m-item-view-null"
            >
                <i class="el-icon-s-opportunity"></i>
                <span>暂无攻略，我要</span>
                <a class="s-link" :href="publish_url(`item/${item.id}`)"
                    >完善攻略</a
                >
            </div>
            <div
                v-if="post && JSON.stringify(post) !== '{}'"
                class="m-archive-list"
            >
                <div class="m-module m-item-post">
                    <div class="m-head">
                        <a
                            class="el-button el-button--primary u-publish s-link"
                            :href="publish_url(`item/${item.id}`)"
                        >
                            <i class="el-icon-edit"></i>
                            <span>完善物品攻略</span>
                        </a>
                        <h4 class="u-title">
                            <img
                                class="u-icon"
                                svg-inline
                                src="../assets/img/item.svg"
                            />
                            <span>物品攻略</span>
                        </h4>
                    </div>
                    <div class="m-body">
                        <div class="content m-single-primary">
                            <Article :content="post.content" />
                        </div>
                        <div class="other">
                            <div v-if="post.user_avatar" class="avatar">
                                <img :src="post.user_avatar | showAvatar" />
                            </div>
                            <div class="done">
                                <a
                                    :href="post.user_id | author_url"
                                    v-text="post.user_nickname"
                                ></a>
                            </div>
                            <div
                                class="updated"
                                v-text="
                                    '最后编辑于 ' +
                                        $options.filters.date_format(
                                            post.updated
                                        )
                                "
                            ></div>
                            <a
                                class="comment"
                                href="javascript:void(0)"
                                @click="go_to_comment"
                                v-text="'前往评论'"
                            ></a>
                            <div class="remark">
                                可通过评论通知原贡献者进行更改与署名补充
                            </div>
                        </div>
                    </div>
                </div>

                <div class="m-module">
                    <div class="m-head">
                        <h4 class="u-title">📄 历史版本</h4>
                    </div>
                    <div class="m-body">
                        <Revisions :item_id="item.id" />
                    </div>
                </div>

                <div class="m-module m-cj-comments">
                    <div class="m-head">
                        <h4 class="u-title">💖 评论</h4>
                    </div>
                    <div class="m-body">
                        <Comments :item_id="item.id" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import Fav from "@jx3box/jx3box-common-ui/src/interact/Fav.vue";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
import ItemIcon from "@/components/ItemIcon.vue";
import Revisions from "@/components/Revisions.vue";
import Comments from "@/components/Comments.vue";
import Search from "@/components/Search.vue";
import RelationPlans from "@/components/RelationPlans.vue";
import { postStat } from "@jx3box/jx3box-common/js/stat";
import { get_item } from "../service/item.js";
import {getThumbnail} from '@jx3box/jx3box-common/js/utils'
import {JX3BOX} from '@jx3box/jx3box-common'

export default {
    name: "Detail",
    props: [],
    data: function() {
        return {
            item: {},
            post: null,
        };
    },
    components: {
        "jx3-item": Item,
        ItemIcon,
        Revisions,
        Comments,
        Article,
        Search,
        Fav,
        "relation-plans": RelationPlans,
    },
    methods: {
        go_to_comment() {
            let target = document.querySelector("#m-reply-form");
            target.scrollIntoView(true);
        },
        publish_url: function(val) {
            return JX3BOX.__Links.dashboard.publish + "#/" + val;
        },
        // 获取物品
        get_data: function() {
            if (!this.$route.params.item_id) return;
            get_item(this.$route.params.item_id)
                .then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        this.item = data.data.item;
                        this.$store.state.sidebar.AucGenre = parseInt(
                            this.item.AucGenre
                        );
                        this.$store.state.sidebar.AucSubTypeID = parseInt(
                            this.item.AucSubTypeID
                        );
                    }
                })
                .catch((e) => {
                    this.item = false;
                });
        },
        // 获取物品最新攻略
        get_item_newest_post() {
          if (!this.$route.params.item_id) return;
          this.$http({
            url: `${JX3BOX.__helperUrl}api/wiki/post`,
            headers: {Accept: "application/prs.helper.v2+json"},
            params: {
              type: "item",
              source_id: this.$route.params.item_id,
            },
            withCredentials: true,
          }).then((res) => {
            res = res.data;
            if(res.code === 200) {
              let wiki_post = res.data;
              this.post = wiki_post.post;
              if (wiki_post && wiki_post.source) {
                let pet = wiki_post.source.pet;
                if (pet && pet.id) postStat('pet', pet.id);
              }
            }
          }).catch((err) => {
            this.post = null;
          });
        },
        // 获取物品攻略
        get_item_post() {
            if (!this.$route.params.post_id) return;
            this.$http({
                url: `${JX3BOX.__helperUrl}api/wiki/post/${this.$route.params.post_id}`,
                headers: { Accept: "application/prs.helper.v2+json" },
                withCredentials: true,
            })
                .then((res) => {
                    this.post = res.data.data.post || {};
                })
                .catch((err) => {
                    this.post = null;
                });
        },
    },
    mounted: function() {
        postStat('item',this.$route.params.item_id);
    },
    watch: {
        "$route.params.item_id": {
            immediate: true,
            handler() {
                // 获取物品
                this.get_data();
                // 获取物品最新攻略
                if (!this.$route.params.post_id) this.get_item_newest_post();
            },
        },
        "$route.params.post_id": {
            immediate: true,
            handler() {
                // 获取物品攻略
                this.get_item_post();
            },
        },
    },
    filters : {
        showAvatar : function (val){
            return val && getThumbnail(val,32,true) || getThumbnail(JX3BOX.default_avatar,32,true)
        }
    }
};
</script>

<style lang="less">
@import "../assets/css/views/detail.less";
</style>
