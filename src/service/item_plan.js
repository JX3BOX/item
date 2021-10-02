import store from "@/store";
import {$helper} from "@jx3box/jx3box-common/js/https";

const qs = require("qs");

function get_item_plan(plan_id) {
    return $helper()({
        method: "GET",
        url: `api/item_plan/${plan_id}`,
    });
}

function get_item_plans(params) {
    return $helper()({
        method: "GET",
        url: `api/item_plans`,
        params: params,
    });
}

// 获取我的清单
function get_my_item_plans(params = {}) {
    params.limit = 5;
    return $helper()({
        method: "GET",
        url: `api/my/item_plans`,
        params: params,
    }).then((data) => {
        data = data.data;
        if (data.code === 200) store.state.my_item_plans = data.data.data;
    });
}

function delete_item_plan(plan_id) {
    return $helper()({
        method: "PUT",
        url: `api/item_plan/remove`,
        data: qs.stringify({ plan_id: plan_id }),
    });
}

export { get_item_plan, get_item_plans, get_my_item_plans, delete_item_plan };
