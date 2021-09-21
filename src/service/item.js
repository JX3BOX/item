import {$http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/data/jx3box.json";

function getMyFavItems(params) {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/my/post/favorites`,
        params: params,
    });
}

function getMenus() {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item/menus`
    });
}

function get_items_count() {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/items/count`
    });
}

// 获取物品
function get_item(item_id) {
    if (!item_id) return;
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item/${item_id}`
    });
}

// 相关物品清单
function get_item_relation_plans(item_id, params) {
    if (!item_id) return;
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item/${item_id}/relation_plans`,
        params: params,
    });
}

// 物品价格
function get_item_prices(item_id, params) {
    if (!item_id) return;
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item/${item_id}/prices`,
        params: params,
    });
}

// 物品价格日志
function get_item_price_logs(item_id, params) {
    if (!item_id) return;
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item/${item_id}/price/logs`,
        params: params,
    });
}

// 物品区服价格日志
function get_item_servers_price_logs(item_id, params) {
    if (!item_id) return;
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item/${item_id}/price/servers/logs`,
        params: params,
    });
}

// 热搜物品列表
function get_items_search_hottest(params) {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/items/search_hottest`,
        params: params,
    });
}

function get_items(params) {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/items`,
        params: params,
    });
}

function get_items_search(params) {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item/search`,
        params: params,
    });
}

function get_menu_items(params) {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item/menu_list`,
        params: params,
    });
}

// 获取物品攻略列表
function get_item_posts() {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/wiki/posts/newest`,
        params: {type: "item"},
    });
}

export {
    getMenus,
    get_items_count,
    get_item,
    get_item_relation_plans,
    get_item_prices,
    get_item_price_logs,
    get_item_servers_price_logs,
    get_items_search_hottest,
    get_items,
    get_items_search,
    get_menu_items,
    get_item_posts,
    getMyFavItems
};
