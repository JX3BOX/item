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
            <div class="m-price-list" v-if="items && items.length">
                <el-row :gutter="20">
                    <el-col :span="6" v-for="(item, key) in items" :key="key">
                        <router-link
                            v-if="item"
                            class="u-item"
                            :class="`u-item-${key}`"
                            :to="{name:'view',params: {item_id: item.id}}"
                        >
                            <div class="u-icon">
                                <img :src="$options.filters.icon_url(item.IconID)" />
                            </div>
                            <div class="u-content">
                                <span class="u-name">
                                    <span v-text="item.Name"></span>
                                </span>
                                <span class="u-price">
                                    <GamePrice :price="item.log && item.log.price" />
                                    <!-- <GamePrice :price="item.log && item.log.min_price" /> -->
                                    <!-- <GamePrice :price="item.log && item.log.max_price" /> -->
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
import { get_items_search_hottest } from "@/service/item";
import servers from "@jx3box/jx3box-data/data/server/server_list.json";
import GamePrice from "./GamePrice.vue";
export default {
    name: "SearchHottest",
    data() {
        return {
            items: [],
            server: "斗转星移",
            servers: servers,
        };
    },
    components: {
        WikiPanel,
        GamePrice,
    },
    methods: {
        // 获取热搜物品
        get_data() {
            get_items_search_hottest({ server: this.server }).then((data) => {
                data = data.data;
                if (data.code === 200) this.items = data.data.items || [];
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
};
</script>

<style scoped lang="less">
.m-price-list{
    .u-item{
        .db;.clearfix;
        .mb(10px);
        background-color: @bg-gray;
        transition: 0.1s ease-in-out;

        &:hover{
            background-color: #ceefff;
        }
    }
    .u-icon{
        .fl;
        .mr(10px);
        .size(32px);
    }
    .u-content{
        .fz(12px,32px);
        .bold;
    }
    .u-name{
        
    }
    .u-price{
        .fr;
        color:@color;
    }
}
@media screen and (max-width:@phone){
    .m-price-list{
        .el-col-6{
            .w(100%);
        }
    }
}
</style>