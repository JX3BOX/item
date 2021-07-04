<template>
  <div class="m-module">
    <div class="m-head">
      <div class="fr" style="margin-top:5px;margin-right:10px">
        <el-select v-model="server" placeholder="请选择服务器" size="mini">
          <el-option v-for="serve in servers" :key="serve" :label="serve" :value="serve"></el-option>
        </el-select>
      </div>
      <h4 class="u-title">📜 交易行近期价格</h4>
    </div>
    <div class="m-body">
      <table class="m-item-prices" v-if="prices.length">
        <tr>
          <th>物品</th>
          <th>等级</th>
          <th>上传时间</th>
          <th>服务器</th>
          <th style="text-align:right">一口价 (总价)</th>
          <th style="text-align:right">一口价 (单价)</th>
        </tr>
        <tr v-for="(price, key) in prices" :key="key">
          <td>
            <div class="m-item-icon">
              <img class="u-icon" :src="$options.filters.icon_url(item.IconID)">
              <span class="u-count" v-if="price.n_count>1" v-text="price.n_count"></span>
            </div>
            <span class="u-name" v-text="item.Name" :class="{white:item.Quality==1}"
                  :style="{color:$options.filters.item_color(item.Quality)}"></span>
          </td>
          <td v-text="price.RequireLevel?price.RequireLevel:1"></td>
          <td v-text="$options.filters.date_format(price.created)"></td>
          <td v-text="price.server"></td>
          <td style="text-align:right" v-text="$options.filters.item_price(price.n_money)"></td>
          <td style="text-align:right" v-text="$options.filters.item_price(price.unit_price)"></td>
        </tr>
      </table>
      <div v-else style="text-align:center">🐖 暂无记录</div>
    </div>
  </div>
</template>

<script>
  import {get_item_prices} from '../service/item';
  import servers from '@jx3box/jx3box-data/data/server/server_list.json';

  export default {
    name: "ItemPrices",
    props: ["item_id"],
    data() {
      return {
        item: null,
        prices: [],
        server: '',
        servers: servers,
      };
    },
    methods: {
      get_data() {
        if (this.server && this.item_id) {
          get_item_prices(this.item_id, {server: this.server, limit: 30}).then((data) => {
            data = data.data;
            if (data.code === 200) {
              this.item = data.data.item;
              this.prices = data.data.prices;
            }
          });
        }
      }
    },
    watch: {
      item_id() {
        this.get_data();
      },
      server() {
        this.get_data();
      },
    },
  };
</script>

<style lang="less">
  @import '../assets/css/components/item_prices.less';
</style>
