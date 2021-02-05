<template>
    <div class="m-items-my">
        <div>
            <h3 class="c-sidebar-right-title">
                <i class="u-icon u-icon-mycollection"
                    ><img svg-inline src="../assets/img/my.svg"
                /></i>
                <span>{{ isLogin ? "收藏物品" : "热门物品" }}</span>
            </h3>
            <template v-if="data && data.length">
                <div class="m-items-my-list">
                    <router-link
                        class="u-item"
                        v-for="(item, key) in data"
                        :key="key"
                        :to="{ name: 'view', params: { item_id: item.id } }"
                    >
                        <ItemIcon :item="item" />
                    </router-link>
                </div>
                <a class="u-more" href="/dashboard/#/fav" target="_blank"
                    >查看更多 &raquo;</a
                >
            </template>
            <div v-if="isLogin && !data.length" class="u-tip">
                <i class="el-icon-warning-outline"></i> 暂无收藏物品
            </div>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import ItemIcon from "@/components/ItemIcon";
import { getRank } from "../service/stat.js";
import { get_items } from "../service/item.js";
export default {
    name: "",
    props: [],
    data: function() {
        return {
            isLogin: User.isLogin(),
            data: [],
        };
    },
    computed: {},
    methods: {},
    mounted: function() {
        if (this.isLogin) {
            // TODO:我收藏的物品
        } else {
            // 获取热门物品
            getRank().then((data) => {
                data = data.data;

                let ranks = [],
                    item_ids = [];
                for (let i in data) {
                    let name = this.$_.get(data, `${i}.name`, "-");
                    let item_id = this.$_.get(name.split("-"), 1, "");
                    if (item_id) {
                        item_ids.push(item_id);
                        ranks[item_id] = this.$_.get(data, `${i}.value`, {});
                    }
                }
                item_ids = item_ids.slice(0, 15);

                get_items({ ids: item_ids, limit: item_ids.length }).then(
                    (data) => {
                        data = data.data;
                        if (data.code === 200) {
                            data = data.data.data;

                            // 使用id作为键值
                            let items = {};
                            for (let i in data) items[data[i].id] = data[i];

                            // 数据填充保持原有排序
                            let output = [];
                            for (let i in item_ids) {
                                let id = item_ids[i];
                                let item = items[id];
                                if (item) {
                                    item.rank = ranks[id];
                                    output.push(item);
                                }
                            }

                            this.data = output;
                        }
                    }
                );
            });
        }
    },
    components: {
        ItemIcon,
    },
};
</script>
