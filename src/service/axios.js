import axios from "axios";
import {jx3ClientType} from "@jx3box/jx3box-common/js/utils";

const $http = axios.create({
    withCredentials: true,
    headers: {
        Accept: "application/prs.helper.v2+json",
        'JX3-Client-Type': jx3ClientType()
    }
});

export {$http, axios};
