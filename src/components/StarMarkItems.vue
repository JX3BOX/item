<template>
    <WikiPanel border-none="true" class="m-search-hottest">
        <template slot="head-title">
            <i class="el-icon-shopping-bag-1"></i>
            <span>交易趋势</span>
        </template>
        <template slot="head-actions">
            <el-select class="u-server" v-model="server" placeholder="请选择服务器" size="mini">
                <el-option v-for="serve in servers" :key="serve" :label="serve" :value="serve"></el-option>
            </el-select>
        </template>
        <template slot="body">
            <div class="m-price-list" v-if="groups && groups.length">
                <el-row :gutter="20" v-for="(group, key) in groups" :key="key">
                    <el-col class="u-group-title" v-text="group.label"></el-col>
                    <el-col :span="6" v-for="(item, k) in group.items" :key="k">
                        <router-link
                            v-if="item"
                            class="u-item"
                            :class="`u-item-${key}`"
                            :to="{name:'view',params: {item_id: item.item_id}}"
                        >
                            <div class="u-icon">
                                <img :src="$options.filters.icon_url(item.icon)" />
                            </div>
                            <div class="u-content">
                                <span class="u-name">
                                    <span v-text="item.label"></span>
                                </span>
                                <span class="u-price">
                                    <template v-if="item.sub_days_0_price">
                                        <span>今日：</span>
                                        <GamePrice :price="item.sub_days_0_price" />
                                    </template>
                                    <template
                                        v-else-if="!item.sub_days_0_price && item.sub_days_1_price"
                                    >
                                        <span>昨日：</span>
                                        <GamePrice :price="item.sub_days_1_price" />
                                    </template>
                                    <template
                                        v-else-if="!item.sub_days_0_price && !item.sub_days_1_price && item.sub_days_2_price"
                                    >
                                        <span>前日：</span>
                                        <GamePrice :price="item.sub_days_2_price" />
                                    </template>
                                    <span v-else>暂无价目</span>
                                </span>
                            </div>
                        </router-link>
                    </el-col>
                </el-row>
            </div>
            <div v-else style="text-align:center">😂 暂无数据</div>
        </template>
    </WikiPanel>
</template>

<script>
import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
import { get_item_groups_with_price } from "@/service/item_group";
import servers from "@jx3box/jx3box-data/data/server/server_list.json";
import GamePrice from "./GamePrice.vue";
import { getProfile } from "@/service/user";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "StarMarkItems",
    data() {
        return {
            groups: [],
            server: "斗转星移",
            servers: servers,
        };
    },
    components: {
        WikiPanel,
        GamePrice,
    },
    methods: {
        // 获取星标物品
        get_data() {
            get_item_groups_with_price({
                server: this.server,
                keys: [
                    "wuxingshi",
                    "baoxiang",
                    "teshucailiao",
                    "caijincailiao",
                    "paodingcailiao",
                    "shennongcailiao",
                    "anqi",
                ],
            }).then((data) => {
                data = data.data;
                if (data.code === 200)
                    this.groups = Object.values(data.data.data) || [];
            });
        },
    },
    watch: {
        server: {
            immediate: true,
            handler() {
                this.get_data();
            },
        },
    },
    mounted: function () {
        if (User.isLogin()) {
            getProfile().then((data) => {
                if (data) {
                    this.server = data.jx3_server;
                }
            });
        }
    },
};
</script>

<style scoped lang="less">
.m-price-list {
    .u-group-title {
        .mb(8px);
        font-weight: 600;
        color: #666666;
    }

    .u-item {
        .db;
        .clearfix;
        .mb(10px);
        background-color: @bg-gray;
        transition: 0.1s ease-in-out;

        &:hover {
            background-color: #ceefff;
        }
    }

    .u-icon {
        .fl;
        .mr(10px);
        .size(32px);
    }

    .u-content {
        .fz(12px, 32px);
        .bold;
    }

    .u-name {
    }

    .u-price {
        .fr;
        color: @color;
    }
}

@media screen and (max-width: 1920px) {
    .m-price-list {
        .el-col {
            .w(33%);
        }
    }
}
@media screen and (max-width: 1280px) {
    .m-price-list {
        .el-col {
            .w(50%);
        }
    }
}
@media screen and (max-width: @phone) {
    .m-price-list {
        .el-col {
            .w(100%);
        }
    }
}
</style>