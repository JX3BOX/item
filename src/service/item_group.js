import {$http} from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/data/jx3box.json";

function get_item_groups_with_price(params) {
    return $http({
        method: "GET",
        url: `${__helperUrl}api/item_groups/with_price`,
        params: params,
    });
}

export {
    get_item_groups_with_price
};
