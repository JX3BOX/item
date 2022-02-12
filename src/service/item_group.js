import {$helper} from "@jx3box/jx3box-common/js/https";

function get_item_groups_with_price(params) {
    return $helper().get(`api/item_groups/with_price`, {
        params
    })
}

export {
    get_item_groups_with_price
};
