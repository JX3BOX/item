import {$http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";
import User from "@jx3box/jx3box-common/js/user";
import store from "@/store";

const qs = require("qs");

function get_item_plan(plan_id) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/item_plan/${plan_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

function get_item_plans(params) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/item_plans`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

// 获取我的清单
function get_my_item_plans(params) {
  return $http({
    method: "GET",
    url: `${__helperUrl}api/my/item_plans`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  }).then(
      (data) => {
        data = data.data;
        if (data.code === 200) store.state.my_item_plans = data.data.data;
      }
  );
}

function delete_item_plan(plan_id) {
  return $http({
    method: "PUT",
    url: `${__helperUrl}api/item_plan/remove`,
    headers: {Accept: "application/prs.helper.v2+json"},
    data: qs.stringify({plan_id: plan_id}),
  });
}

export {get_item_plan, get_item_plans, get_my_item_plans, delete_item_plan};
