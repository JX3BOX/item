<template>
  <div class="m-module">
    <div class="m-head">
      <h4 class="u-title">📈 价格波动</h4>
    </div>
    <div class="m-body">
      <div v-show="!hidden" id="m-item-price-chart"/>
      <div v-show="!logs.length" style="text-align:center">🐖 暂无记录</div>
    </div>
  </div>
</template>

<script>
  import {Chart} from '@antv/g2';
  import {get_item_price_logs, get_item_prices} from '../service/item';

  export default {
    name: "ItemPriceChart",
    props: ['item_id', 'server'],
    data() {
      return {
        logs: [],
        chart: null,
        hidden: false,
      };
    },
    mounted() {
      this.chart = new Chart({
        container: 'm-item-price-chart',
        autoFit: true,
        width: '100%',
        height: 500,
      });

      this.chart.scale({
        date: {
          range: [0, 1],
        },
        price: {
          nice: true,
        },
      });

      this.chart.tooltip({
        showCrosshairs: true,
        shared: true,
      });

      this.chart.axis('price', {
        label: {
          formatter: (val) => {
            return this.$options.filters.item_price(val);
          },
        },
      });

      this.chart.tooltip({
        customItems: (items) => {
          for (let index = 0; index < items.length; index++) {
            items[index].value = this.$options.filters.item_price(items[index].value)
          }
          return items;
        },
      });

      this.chart
          .line()
          .position('date*price')
          .color('type')
          .shape('smooth');

      this.chart
          .point()
          .position('date*price')
          .color('type')
          .shape('circle');

      this.hidden = true;
    },
    methods: {
      get_data() {
        if (this.server && this.item_id) {
          get_item_price_logs(this.item_id, {server: this.server}).then((data) => {
            data = data.data;
            if (data.code === 200) {
              let output = [];
              for (let i in data.data.logs) {
                let log = data.data.logs[i];
                output.push({date: log.date, price: log.price, type: '均价'});
                output.push({date: log.date, price: log.min_price, type: '最低价'});
                output.push({date: log.date, price: log.max_price, type: '最高价'});
              }
              this.logs = output;
              this.hidden = !(output.length > 0);
            }
          });
        }
      },
      render() {
        this.chart.data(this.logs);
        this.chart.render();
      }
    },
    watch: {
      item_id() {
        this.get_data();
      },
      server() {
        this.get_data();
      },
      logs() {
        this.render();
      }
    },
  };
</script>

<style lang="less">
  @import '../assets/css/components/item_prices.less';
</style>
