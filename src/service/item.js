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

function get_items(params) {
    return $http.get(`${API}s`, {
        headers: {Accept: "application/prs.helper.v2+json"},
        params: params,
    });
}

export {get_home_icons, get_items_count, get_items};
