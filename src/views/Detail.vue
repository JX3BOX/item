<template>
    <div id="m-item-view" class="m-item-index">
        <el-row v-if="item && JSON.stringify(item) !== '{}'" class="m-item">
            <el-col :xs="24" :md="3" class="m-name">
                <img class="u-icon" :src="$options.filters.icon_url(item.IconID)"
                     :title="$options.filters.description(item.Desc)">
                <h6 class="u-name" :class="{white:item.Quality==1}" v-text="item.Name"
                    :style="{color:$options.filters.item_color(item.Quality)}"></h6>
                <div class="u-description" v-text="$options.filters.description(item.Desc)"></div>
            </el-col>
            <el-col :xs="24" :md="21">
                <el-row class="m-fields">
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">回购价格：</label>
                        <span class="u-value" v-text="$options.filters.item_price(item.Price)"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">品质等级：</label>
                        <span class="u-value" v-text="item.Level"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">绑定类型：</label>
                        <span class="u-value" v-text="$options.filters.item_bind(item.BindType)"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field" v-if="item.Require1Type">
                        <label class="u-title" v-text="$options.filters.item_require_1_type(item.Require1Type)"></label>
                        <span class="u-value" v-text="item.Require1Value"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">耐久度：</label>
                        <span class="u-value" v-text="`${item.MaxDurability}/${item.MaxDurability}`"></span>
                    </el-col>
                    <!--<el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">磨损率：</label>
                        <span class="u-value" v-text="item.AbradeRate"></span>
                    </el-col>-->
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">存放时间：</label>
                        <span class="u-value" v-text="item.MaxExistTime"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">最大拥有数：</label>
                        <span class="u-value" v-text="item.MaxExistAmount?item.MaxExistAmount:'无限制'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否交易：</label>
                        <span class="u-value" v-text="item.CanTrade?'✔️':'❌'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否丢弃：</label>
                        <span class="u-value" v-text="item.CanDestroy||item.CanDestroy===null?'✔️':'❌'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">品质：</label>
                        <span class="u-value" v-text="$options.filters.item_quality(item.Quality)"
                              :style="{color:$options.filters.item_color(item.Quality)}"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">适用门派：</label>
                        <span class="u-value" v-text="item.BelongSchool"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">心法：</label>
                        <span class="u-value" v-text="item.MagicKind"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">属性：</label>
                        <span class="u-value" v-text="item.MagicType"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">获得途径：</label>
                        <span class="u-value" v-text="item.GetType"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否改色：</label>
                        <span class="u-value" v-text="item.CanSetColor?'✔️':'❌'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">阵营：</label>
                        <span class="u-value" v-text="$options.filters.item_require_camp(item.RequireCamp)"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否分解：</label>
                        <span class="u-value" v-text="item.CanApart?'✔️':'❌'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否收集：</label>
                        <span class="u-value" v-text="item.CanExterior?'✔️':'❌'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否附魔：</label>
                        <span class="u-value" v-text="item.CanChangeMagic?'✔️':'❌'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否共享：</label>
                        <span class="u-value" v-text="item.CanShared?'✔️':'❌'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">PVE装备：</label>
                        <span class="u-value" v-text="item.IsPVEEquip?'✔️':'❌'"></span>
                    </el-col>
                    <!--<el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">修理费：</label>
                        <span class="u-value" v-text="item.RepairPriceRebate"></span>
                    </el-col>-->
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否堆叠：</label>
                        <span class="u-value" v-text="item.CanStack?'✔️':'❌'"></span>
                    </el-col>
                    <el-col :xs="12" :md="8" class="m-field">
                        <label class="u-title">能否消耗：</label>
                        <span class="u-value" v-text="item.CanConsume?'✔️':'❌'"></span>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
        <div v-if="post && JSON.stringify(post) === '{}'" class="m-cj-post-null">
            <span>暂无攻略，我要</span>
            <a class="s-link" :href="publish_url(`cj/${item.ID}`)">完善攻略</a>
        </div>
        <div v-if="post && JSON.stringify(post) !== '{}'" class="m-archive-list">
            <div class="m-module m-cj-post">
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

            <div class="m-module m-cj-revisions">
                <div class="u-head">
                    <h4 class="u-title">📄 历史版本</h4>
                </div>
                <div class="u-body">
                    <Revisions :item_id="item.UiID"/>
                </div>
            </div>

            <div class="m-module m-cj-comments">
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
                    url: `${JX3BOX.__helperUrl}api/wiki/post`,
                    headers: {Accept: "application/prs.helper.v2+json"},
                    params: {
                        type: 'item',
                        source_id: this.$route.params.item_id,
                    },
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
                    // 获取物品最新攻略
                    if (!this.$route.params.post_id) this.get_item_newest_post();
                }
            },
            '$route.params.post_id': {
                immediate: true,
                handler() {
                    // 获取物品攻略
                    // this.get_item_post();
                }
            }
        }
    }
</script>

<style lang="less">
    @import '../assets/css/views/detail.less';
</style>