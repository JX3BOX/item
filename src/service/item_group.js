import { $http, $helper } from "./axios";

const { __helperUrl } = require("@jx3box/jx3box-common/data/jx3box.json");
const qs = require("qs");

function get_item_groups_with_price(params) {
    return $helper.get("/api/item_groups/with_price", {
        params: params,
        headers: { Accept: "application/prs.helper.v2+json" },
    });
}

export {
    get_item_groups_with_price
};
