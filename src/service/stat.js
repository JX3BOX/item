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
function postStat(id) {
    return $next.get("api/summary-any/" + "item-" + id, {
        params: {
            type: "item",
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
            pageSize: 15,
        },
    });
}

export { getStat, postStat, getRank };
