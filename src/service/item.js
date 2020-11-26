import {$http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";

const API = __helperUrl + "api/item";
const qs = require("qs");

function get_home_icons() {
  return $http.get(`${API}/home_icons`, {
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

function get_items_count() {
  return $http.get(`${API}s/count`, {
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

// 获取物品
function get_item(item_id) {
  if (!item_id) return;
  return $http({
    url: `${__helperUrl}api/item/${item_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
    withCredentials: true,
  })
}

function get_items(params) {
  return $http.get(`${__helperUrl}api/items`, {
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

function get_items_search(params) {
  return $http.get(`${__helperUrl}api/item/search`, {
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

function get_menu_items(params) {
  return $http.get(`${__helperUrl}api/item/menu_list`, {
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  })
}

// 获取物品攻略列表
function get_item_posts() {
  return $http.get(`${__helperUrl}api/wiki/posts/newest`, {
    headers: {Accept: "application/prs.helper.v2+json"},
    withCredentials: true,
    params: {type: 'item'},
  });
}

export {get_home_icons, get_items_count, get_item, get_items, get_items_search, get_menu_items, get_item_posts};
