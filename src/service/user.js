import { $cms } from "@jx3box/jx3box-common/js/https";

function getProfile() {
    return $cms({ mute: true })
        .get("/api/cms/user/my/profile")
        .then((res) => {
            return res.data.data;
        });
}

function getMeta(key) {
    return $cms({ mute: true }).get("/api/cms/user/my/meta", {
        params: {
            key: key,
        },
    });
}

export { getProfile, getMeta };
