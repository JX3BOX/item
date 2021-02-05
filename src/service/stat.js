import { $next } from "@jx3box/jx3box-common/js/axios";

function getStat(id) {
    return $next
        .get("api/summary-any/" + id + "/stat")
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function post_item_stat(id) {
    if (!id) return null;
    return $next.get("api/summary-any/" + "item-" + id, {
        params: {
            type: "item",
            actions: "views",
        },
    });
}

function post_item_plan_stat(id) {
    if (!id) return null;
    return $next.get("api/summary-any/" + "item_plan-" + id, {
        params: {
            type: "item_plan",
            actions: "views",
        },
    });
}

function getRank() {
    return $next.get("api/summary/visit/rank", {
        params: {
            postType: "item",
            postAction: "views",
            sort: "7days",
            pageSize: 24,
        },
    });
}

export { getStat, post_item_stat, post_item_plan_stat, getRank };
