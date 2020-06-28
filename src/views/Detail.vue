<template>
    <div id="m-cj-view" class="m-cj-index">
        <div v-if="item && JSON.stringify(item) !== '{}'" class="m-item">
            <img class="u-icon" :src="$options.filters.icon_url(item.IconID)"
                 :title="$options.filters.description(item.Desc)">
            <h6 class="u-name" :class="{white:item.Quality==1}" v-text="item.Name"
                :style="{color:$options.filters.item_color(item.Quality)}"></h6>
            <ul>
                <li v-text="'描述：'+$options.filters.description(item.Desc)"></li>
                <li v-text="'价格：'+$options.filters.item_price(item.Price)"></li>
                <li v-text="'品级：'+$options.filters.item_bind(item.BindType)"></li>
                <li v-text="'耐久度：'+item.MaxDurability"></li>
                <li v-text="'磨损率：'+item.AbradeRate"></li>
                <li v-text="'存放时间：'+item.MaxExistTime"></li>
                <li v-text="'最大拥有数：'+item.MaxExistAmount"></li>
                <li v-text="'能否交易：'+(item.CanTrade?'能':'不能')"></li>
                <li v-text="'能否丢弃：'+(item.CanDestroy||item.CanDestroy===null?'能':'不能')"></li>
                <li v-text="'品质：'+item.Quality"></li>
                <li v-text="'门派：'+item.BelongSchool"></li>
                <li v-text="'心法：'+item.MagicKind"></li>
                <li v-text="'属性：'+item.MagicType"></li>
                <li v-text="'获得途径：'+item.GetType"></li>
                <li v-text="'能否改色：'+(item.CanSetColor?'能':'不能')"></li>
                <li v-text="'阵营：'+item.RequireCamp"></li>
                <li v-text="'能否分解：'+(item.CanApart?'能':'不能')"></li>
                <li v-text="'能否收集：'+(item.CanExterior?'能':'不能')"></li>
                <li v-text="'能否附魔：'+(item.CanChangeMagic?'能':'不能')"></li>
                <li v-text="'能否分享：'+(item.CanShared?'能':'不能')"></li>
                <li v-text="'PVE装备：'+(item.IsPVEEquip?'是':'否')"></li>
                <li v-text="'修理费：'+item.RepairPriceRebate"></li>
                <li v-text="'能否堆叠：'+(item.CanStack?'能':'不能')"></li>
                <li v-text="'能否消耗：'+(item.CanConsume?'能':'不能')"></li>
            </ul>
        </div>
        <div v-if="post && JSON.stringify(post) === '{}'" class="m-cj-post-null">
            <span>暂无攻略，我要</span>
            <a class="s-link" :href="publish_url(`cj/${item.ID}`)">完善攻略</a>
        </div>
        <div v-if="post && JSON.stringify(post) !== '{}'" class="m-archive-list">
            <div class="cj-module m-cj-post">
                <div class="u-head">
                    <a class="el-button el-button--primary u-publish s-link"
                       :href="publish_url(`cj/${item.ID}`)">
                        <i class="el-icon-edit"></i>
                        <span>完善物品攻略</span>
                    </a>
                    <h4 class="u-title">
                        <img class="u-icon" svg-inline src="../assets/img/item.svg"/>
                        <span>物品攻略</span>
                    </h4>
                </div>
                <div class="u-body">
                    <div class="content m-single-primary">
                        <Article :content="post.content"/>
                    </div>
                    <div class="other">
                        <div v-if="post.user_avatar" class="avatar"><img :src="post.user_avatar"></div>
                        <div class="done" v-text="post.user_nickname"></div>
                        <div class="updated" v-text="'最后编辑于 '+$options.filters.date_format(post.updated)"></div>
                        <a class="comment" href="javascript:void(0)" @click="go_to_comment" v-text="'前往评论'"></a>
                        <div class="remark">可通过评论通知原贡献者进行更改与署名补充</div>
                    </div>
                </div>
            </div>

            <div class="cj-module m-cj-revisions">
                <div class="u-head">
                    <h4 class="u-title">📄 历史版本</h4>
                </div>
                <div class="u-body">
                    <Revisions :item_id="item.UiID"/>
                </div>
            </div>

            <div class="cj-module m-cj-comments">
                <div class="u-head">
                    <h4 class="u-title">💖 评论</h4>
                </div>
                <div class="u-body">
                    <Comments :item_id="item.UiID"/>
                </div>
            </div>
        </div>
        <ins
                class="adsbygoogle"
                style="display:block;max-width:100%;overflow:hidden;margin:10px;"
                data-ad-client="ca-pub-4388499329141185"
                data-ad-slot="1787190081"
                data-ad-format="auto"
                data-full-width-responsive="true"
        ></ins>
    </div>
</template>

<script>
    // import Item from '@/components/Item.vue';
    // import Revisions from '@/components/Revisions.vue';
    // import Comments from '@/components/Comments.vue';

    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: 'Detail',
        props: [],
        data: function () {
            return {
                item: {},
                post: null,
                show_relations: false,
                show_relations_primary: true
            }
        },
        components: {
            // Item,
            // Revisions,
            // Comments,
        },
        methods: {
            relations_got(relations) {
                this.show_relations = this.$_.get(relations, 'length', 0) > 0;
            },
            go_to_comment() {
                let target = document.querySelector('#m-reply-form');
                target.scrollIntoView(true);
            },
            publish_url: function (val) {
                return JX3BOX.__Links.dashboard.publish + "#/" + val;
            },
            // 获取物品
            get_item: function () {
                if (!this.$route.params.item_id) return;
                this.$http({
                    url: `${JX3BOX.__helperUrl}api/item/${this.$route.params.item_id}`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    withCredentials: true
                }).then(data => {
                    data = data.data;
                    if (data.code === 200) {
                        this.item = data.data.item;
                        this.$store.state.sidebar.AucGenre = parseInt(this.item.AucGenre);
                        this.$store.state.sidebar.AucSubTypeID = parseInt(this.item.AucSubTypeID);
                    }
                }).catch((e) => {
                    this.item = false;
                });
            },
            // 获取物品最新攻略
            get_item_newest_post() {
                if (!this.$route.params.item_id) return;
                this.$http({
                    url: `${JX3BOX.__helperUrl}api/wiki/${this.$route.params.item_id}/post`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    withCredentials: true
                }).then(res => {
                    this.post = res.data.data.post || {};
                }).catch(err => {
                    this.post = null;
                });
            },
            // 获取物品攻略
            get_item_post() {
                if (!this.$route.params.post_id) return;
                this.$http({
                    url: `${JX3BOX.__helperUrl}api/wiki/post/${this.$route.params.post_id}`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    withCredentials: true
                }).then(res => {
                    this.post = res.data.data.post || {};
                }).catch(err => {
                    this.post = null;
                });
            }
        },
        mounted: function () {
        },
        watch: {
            '$route.params.item_id': {
                immediate: true,
                handler() {
                    // 获取物品
                    this.get_item();
                    // // 获取物品最新攻略
                    // if(!this.$route.params.post_id) this.get_item_newest_post();
                }
            },
            '$route.params.post_id': {
                immediate: true,
                handler() {
                    // // 获取物品攻略
                    // this.get_item_post();
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/css/views/detail.less';
</style>