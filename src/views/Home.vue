<template>
    <div class="m-item-index m-item-home">
        <div class="m-module">
            <div class="u-head">
                <h4>稀世物品</h4>
            </div>
            <div class="u-body">
                <div class="m-orange">
                    <a class="u-orange" :class="{'small':item.small,'big':item.big}" v-for="(item,key) in icon_items" :key="key"
                       :title="item.Name" :href="item.Link">
                        <img :src="$options.filters.icon_url(item.IconID)">
                    </a>
                </div>
            </div>
        </div>

        <div class="m-module">
            <div class="u-head">
                <h4>最近攻略</h4>
            </div>
            <div class="u-body">
                <el-row class="cj-post-list" v-if="newest_posts.length">
                    <el-col class="cj-post" v-for="(post, key) in newest_posts" :key="key">
                        <div class="m-head">
                            <div class="m-user">
                                <div class="u-author">
                                    <img class="u-icon" :src="post.user_avatar | resolveAvatarPath"
                                         :alt="post.user_nickname"/>
                                    <span class="u-name" v-text="post.user_nickname"></span>
                                </div>
                                <div class="u-updated" v-text="$options.filters.date_format(post.updated)"></div>
                            </div>
                            <div class="m-achievement">
                                <div class="u-achievement">
                                    <img class="u-icon" @error.once="img_error_handle"
                                         :src="icon_url_filter(post.cj_icon_id)"/>
                                    <router-link class="u-name" v-text="post.title"
                                                 :to="{name: 'view',params: { cj_id: post.cj_id }}"></router-link>
                                </div>
                                <div class="u-level" v-text="'综合难度：' + render_stars(post.level)"></div>
                                <div class="u-remark" v-if="post.remark" v-text="'📑 ' + post.remark"></div>
                            </div>
                        </div>
                        <div class="m-body">
                            <span class="u-excerpt" :to="{name: 'view',params: { cj_id: post.cj_id }}"
                                  v-html="ellipsis(post.excerpt)"></span>
                        </div>
                    </el-col>
                </el-row>
                <el-row v-else style="text-align:center">😂 暂无攻略</el-row>
            </div>
        </div>
    </div>
</template>

<script>
    import {get_home_icons} from "../service/item.js";

    const {JX3BOX} = require("@jx3box/jx3box-common");

    export default {
        name: 'Home',
        props: [],
        data: function () {
            return {
                icon_items: [],
                newest_posts: [],
            }
        },
        computed: {},
        methods: {},
        mounted: function () {
            get_home_icons().then((res) => {
                res = res.data;
                if (res.code === 200) this.icon_items = res.data.data;
            });

            // 抖动动效
            let indexes = [];
            let is_small = true;
            setInterval(() => {
                if (this.icon_items.length) {
                    let _indexes = [];
                    let length = Math.floor(this.icon_items.length * 0.15);
                    for (let i = 0; i < length; i++) {
                        let index = Math.floor(Math.random() * this.icon_items.length);
                        if (indexes.indexOf(index) === -1) _indexes.push(index);
                    }
                    // 去重
                    indexes = Array.from(new Set(_indexes));
                    for (let i in indexes) this.$set(this.icon_items[indexes[i]], is_small ? 'small' : 'big', true);
                    ((is_small) => {
                        setTimeout(() => {
                            for (let i in indexes) this.$set(this.icon_items[indexes[i]], is_small ? 'small' : 'big', false);
                        }, 300);
                    })(is_small);
                    is_small = !is_small;
                }
            }, 600)
        },
        components: {},
        filters: {}
    }
</script>

<style lang="less">
    @import '../assets/css/views/home.less';
</style>