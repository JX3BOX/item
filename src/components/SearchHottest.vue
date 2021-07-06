<template>
    <WikiPanel border-none="true" class="m-search-hottest">
        <template slot="head-title">
            <i class="el-icon-notebook-1"></i>
            <span>热搜物品</span>
        </template>
        <template slot="body">
            <div class="m--list">
                <el-carousel
                    height="66px"
                    direction="vertical"
                    indicator-position="none"
                    v-if="items && items.length"
                >
                    <el-carousel-item
                        v-for="(rows, key) in items"
                        :key="key"
                        class="m-carousel"
                    >
                        <el-row :gutter="20">
                            <template v-for="(item, k) in rows">
                                <el-col :md="8" v-if="item" :key="k">
                                    <router-link
                                        class="u-item"
                                        :class="`u-item-${k}`"
                                        :to="{name:'view',params: {item_id: item.id}}"
                                    >
                                        <div class="u-icon">
                                            <img :src="$options.filters.icon_url(item.IconID)"/>
                                        </div>
                                        <div class="m-carousel-content">
                                            <span class="u-title">
                                                <span
                                                    v-text="item.Name"
                                                ></span>
                                            </span>
                                            <span class="u-rank">
                                                <span style="display:inline-block"
                                                    v-text="'均价：' + $options.filters.item_price(item.log.price)"></span>
                                                <!--
                                                <span style="display:inline-block"
                                                    v-text="'最低价：' + $options.filters.item_price(item.log.min_price)"></span>
                                                <span style="display:inline-block"
                                                    v-text="'最高价：' + $options.filters.item_price(item.log.max_price)"></span>
                                                -->
                                            </span>
                                        </div>
                                    </router-link>
                                </el-col>
                            </template>
                        </el-row>
                    </el-carousel-item>
                </el-carousel>
                <div v-else style="text-align:center">😂 暂无热搜物品</div>
            </div>
        </template>
    </WikiPanel>
</template>

<script>
    import WikiPanel from "@jx3box/jx3box-common-ui/src/WikiPanel";
    import {get_items_search_hottest} from "@/service/item";

    export default {
        name: "SearchHottest",
        props: ['server'],
        data() {
            return {
                items: [],
            };
        },
        components: {
            WikiPanel,
        },
        methods: {
            chuck(arr, number = 3) {
                let output = [];
                for (let i = 0; i < arr.length; i += number) {
                    output.push(arr.slice(i, i + number));
                }
                return output;
            },
            // 获取热搜物品
            get_data() {
                get_items_search_hottest({server: this.server}).then((data) => {
                    data = data.data;
                    if (data.code === 200) this.items = this.chuck(Object.values(data.data.items));
                });
            },
        },
        watch: {
            server: {
                immediate: true,
                handler() {
                    this.get_data();
                }
            }
        }
    };
</script>
