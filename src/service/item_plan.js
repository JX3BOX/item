import {$http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";

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

export {get_item_plan, get_item_plans};
