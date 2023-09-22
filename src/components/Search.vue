<template>
    <div class="m-search-panel">
        <div class="m-search-bar" :class="$route.name == 'view' ? 'can-return' : ''">
            <div class="m-return">
                <el-button class="u-return-btn" @click="return_handle"
                    ><i class="el-icon-arrow-left"></i>返回</el-button
                >
            </div>
            <div class="m-search">
                <el-input
                    class="u-search-input"
                    v-model="keyword"
                    @keydown.enter.native="search_handle"
                    placeholder="输入物品名称（可适配中括号形式）/物品描述「回车」进行搜索"
                >
                    <span slot="prepend"> <i class="el-icon-search"></i> 关键词 </span>
                    <el-button slot="append" class="u-search-btn" type="primary" plain @click="search_handle">
                        <i class="el-icon-position"></i> 搜索
                    </el-button>
                </el-input>
                <el-popover placement="bottom-end" trigger="click" popper-class="m-search-filter-popper">
                    <div class="m-search-filter">
                        <el-select v-model="filter.BindType" filterable clearable placeholder="绑定类型">
                            <el-option
                                v-for="item in enums.BindType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                            >
                            </el-option>
                        </el-select>
                        <el-select v-model="filter.BelongSchool" filterable clearable placeholder="所属门派">
                            <el-option v-for="item in enums.BelongSchool" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        <el-select v-model="filter.MagicKind" filterable clearable placeholder="白字类型">
                            <el-option v-for="item in enums.MagicKind" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        <el-select v-model="filter.MagicType" filterable clearable placeholder="绿字类型">
                            <el-option v-for="item in enums.MagicType" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        <el-select v-model="filter.GetType" filterable clearable placeholder="获取方式">
                            <el-option v-for="item in enums.GetType" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                        <el-select v-model="filter.TypeLabel" filterable clearable placeholder="物品类型">
                            <el-option v-for="item in enums.TypeLabel" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </div>
                    <el-button slot="reference" class="u-search-more" type="primary" plain>
                        <i class="el-icon-more"></i>
                    </el-button>
                </el-popover>
            </div>
        </div>
    </div>
</template>

<script>
import { get_item_enums } from "@/service/item";

export default {
    name: "Search",
    data: () => ({
        keyword: "",
        filter: {
            BindType: null,
            BelongSchool: null,
            MagicKind: null,
            MagicType: null,
            GetType: null,
            TypeLabel: null,
        },
        enums: {
            BindType: [],
            BelongSchool: [],
            MagicKind: [],
            MagicType: [],
            GetType: [],
            TypeLabel: [],
        },
    }),
    methods: {
        return_handle() {
            if (history.length <= 1) {
                this.$router.push({
                    name: "home",
                });
            } else {
                history.back();
            }
        },
        search_handle() {
            let query = { page: 1 };
            // 菜单筛选
            if (this.$store.state.sidebar.AucGenre) query.auc_genre = this.$store.state.sidebar.AucGenre;
            if (this.$store.state.sidebar.AucSubTypeID) query.auc_sub_type_id = this.$store.state.sidebar.AucSubTypeID;
            for (let key in this.filter) {
                if (this.filter[key]) query[key] = this.filter[key];
            }
            this.$router.push({
                name: "search",
                params: { keyword: this.keyword },
                query: query,
            });
        },
        initQuery() {
            this.keyword = this.$route.params.keyword;
            const query = this.$route.query;
            for (let key in query) {
                if (this.filter[key] !== undefined)
                    this.filter[key] = !isNaN(Number(query[key])) ? Number(query[key]) : query[key];
            }
        },
    },
    mounted() {
        this.initQuery();
        get_item_enums().then((res) => {
            const data = res.data?.data;
            if (!data) return;
            this.enums = data;
            this.enums.BindType = [
                {
                    label: "不绑定",
                    value: 1,
                },
                {
                    label: "装备后绑定",
                    value: 2,
                },
                {
                    label: "拾取后绑定",
                    value: 3,
                },
            ];
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/components/search.less";
</style>
