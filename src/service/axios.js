import axios from "axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

const $http = axios.create({
    withCredentials: true,
});

const $helper = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __helperUrl : "/",
});

export { $http, $helper };
