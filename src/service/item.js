import { $helper, $next, $node, $cms } from "@jx3box/jx3box-common/js/https";

export function getMyFavItems(params) {
    return $helper().get(`api/my/post/favorites`, {
        params,
    });
}

export function getMenus() {
    return $node().get("/item/menus");
}

export function get_items_count() {
    return $node().get(`/item/count`);
}

// 获取物品
export function get_item(item_id) {
    if (!item_id) return;
    return $node().get(`/item_merged/id/${item_id}`);
}

// 相关物品清单
export function get_item_relation_plans(item_id, params) {
    if (!item_id) return;
    return $helper().get(`api/item/${item_id}/relation_plans`, {
        params,
    });
}

// 物品价格
export function get_item_prices(item_id, params) {
    if (!item_id) return;
    return $next().get(`api/item-price/${item_id}/detail`, {
        params,
    });
}

// 物品价格日志
export function get_item_price_logs(item_id, params) {
    if (!item_id) return;
    return $next().get(`api/item-price/${item_id}/logs`, {
        params,
    });
}

// 物品区服价格日志
export function get_item_servers_price_logs(item_id, params) {
    if (!item_id) return;
    return $next().get(`api/item-price/${item_id}/logs`, {
        params,
    });
}

// 热搜物品列表
export function get_items_search_hottest(params) {
    return $helper().get(`api/items/search_hottest`, {
        params,
    });
}

// 通过node的接口获取物品
export function get_items_by_node(params) {
    let ids = params.ids instanceof Array ? params.ids.join(",") : params.ids;
    return $node().get(`/item_merged/id/${ids}`, {
        params: {
            client: params.client ?? "std",
            per: params.per ?? 20,
        },
    });
}

export function getItemsByName(name, params) {
    return $node().get(`/item_merged/name/${name}`, {
        params,
    });
}

export function get_newest_items(params) {
    return $node().get(`/item/newest`, {
        params: {
            client: params.client ?? "std",
        },
    });
}

export function get_items(params) {
    return $node().get(`/item/list`, {
        params,
    });
}

export function get_items_search(params) {
    return $node().get(`/item/search`, {
        params,
    });
}

export function get_menu_items(params) {
    return $node().get(`/item/menu_list`, {
        params,
    });
}

export function get_item_enums() {
    return $node().get(`/item/enums`);
}

// 获取物品攻略列表
export function get_item_posts() {
    return $helper().get(`api/wiki/posts/newest`, {
        params: {
            type: "item",
        },
    });
}

export function get_waiting(params) {
    params = {
        ...params,
        type: "item",
    };
    return $helper().get(`/api/wiki/posts/waiting`, { params });
}

export function get_waiting_rate(params) {
    params = {
        ...params,
        type: "item",
    };
    return $helper().get(`/api/wiki/posts/counter`, { params });
}

// 获取生活技艺产品原料
export function getManufactureDetail(params) {
    return $node().get(`/manufactures`, {
        params,
    });
}

// 获取物品详情
export function getItemDetail(params) {
    return $node().get(`/other`, {
        params,
    });
}

// 获取硅石信息
export function getItemPrediction(params) {
    return $node().get(`/item/prediction`, {
        params,
    });
}
