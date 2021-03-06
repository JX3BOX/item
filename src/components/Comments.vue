<template>
    <div class="m-comments">
        <div style="padding:5px 0;text-align:center">
            <span v-if="comments === null">Loading...</span>
            <span v-if="comments === false">⚠️ 数据加载异常</span>
            <span v-if="comments && !comments.length">💧 暂无评论</span>
        </div>
        <Comment :comments="comments" :item_id="item_id" />
        <div id="m-reply-form" class="m-reply-form">
            <h4 class="u-title">📰 回复</h4>
            <textarea
                class="u-reply-content"
                style="resize:vertical"
                v-model="reply_form.content"
            ></textarea>
            <div class="u-author">
                <span>作者 : </span>
                <input v-model="reply_form.user_nickname" type="text" />
            </div>
            <button class="u-submit" @click="create_comment(reply_form)">
                📝️ 提交
            </button>
        </div>
    </div>
</template>

<script>
const qs = require("qs");
import Comment from "@/components/Comment.vue";
import JX3BOX from '@jx3box/jx3box-common/data/jx3box.json'
import User from '@jx3box/jx3box-common/js/user.js'
export default {
    name: "Comments",
    props: ["item_id"],
    data: function() {
        return {
            comments: null,
            reply_form: {
                content: "",
                user_nickname: User.getInfo().name,
            },
        };
    },
    computed: {},
    methods: {
        get_comments() {
            let that = this;
            this.$http({
                method: "GET",
                url: `${JX3BOX.__helperUrl}api/wiki/comments`,
                headers: { Accept: "application/prs.helper.v2+json" },
                params:{
                    type: 'item',
                    source_id: this.item_id,
                },
                withCredentials: true,
            }).then(
                function(data) {
                    data = data.data;
                    if (data.code === 200) {
                        let comments = data.data.comments;
                        for (let i = 0; i < comments.length; i++) {
                            comments[i]["reply_form"] = {
                                show: false,
                                content: "",
                                user_nickname: User.getInfo().name,
                            };
                        }
                        that.comments = comments_filter(comments, 0);
                    }
                },
                function() {
                    that.comments = false;
                }
            );
        },
        create_comment(form, parent_id) {
            // 设置parent_id默认值
            if (typeof parent_id === "undefined") parent_id = 0;

            // 校验评论内容
            if (!form.content) {
                alert("请先填写评论内容再尝试提交");
                return;
            }

            this.$http({
                method: "POST",
                url: `${JX3BOX.__helperUrl}api/wiki/comment`,
                headers: { Accept: "application/prs.helper.v2+json" },
                crossDomain: true,
                data: qs.stringify({
                    comment: {
                        type: 'item',
                        source_id: this.item_id,
                        parent_id: parent_id,
                        user_nickname: form.user_nickname || User.getInfo().name,
                        content: form.content,
                    },
                }),
                withCredentials: true,
            })
                .then((data) => {
                    data = data.data;
                    if (data.code === 200) {
                        form.content = "";
                        alert("✔️ 提交成功,请等待审核");
                    } else {
                        alert(`⚠️ ${data.message}`);
                    }
                })
                .catch((err) => {
                    alert("⚠️ 网络异常,提交失败");
                })
                .finally(() => {
                    form.show = false;
                });
        },
    },
    mounted: function() {
        let that = this;
    },
    components: {
        Comment,
    },
    watch: {
        item_id: {
            immediate: true,
            handler() {
                //数据加载
                if (this.item_id) this.get_comments();
            },
        },
    },
};

function comments_filter(comments, parent) {
    let outputs = [];
    for (let index in comments) {
        let item = comments[index];
        if (!item) continue;
        if (item.parent_id === parent) {
            // 置空当前元素
            comments[index] = null;
            // 递归执行
            let children = comments_filter(comments, item.id);
            item.children = children ? children : [];
            outputs.push(item);
        }
    }
    return outputs;
}
</script>

<style lang="less">
    @import '../assets/css/components/comment.less';
</style>
