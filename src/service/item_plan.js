import { $helper } from "@jx3box/jx3box-common/js/https";

const qs = require("qs");

function get_item_plan(plan_id) {
    return $helper().get(`api/item_plan/${plan_id}`);
}

function get_item_plans(params) {
    return $helper().get(`api/item_plans`, {
        params,
    });
}

// 获取我的清单
function get_my_item_plans(params) {
    return $helper().get(`api/my/item_plans`, {
        params,
    });
}

function delete_item_plan(plan_id) {
    return $helper().put(`api/item_plan/remove`, { plan_id });
}

export { get_item_plan, get_item_plans, get_my_item_plans, delete_item_plan };
