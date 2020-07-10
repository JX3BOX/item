/**
 * IconID 转 URL
 *
 * @param {*} icon_id IconID
 */
const {
    __ossRoot,
    __ossMirror,
} = require("@jx3box/jx3box-common/js/jx3box.json");

export default (icon_id) => {
    if (isNaN(parseInt(icon_id))) {
        return `${__ossRoot}image/common/nullicon.png`;
    } else {
        return `${__ossRoot}icon/${icon_id}.png`;
    }
};
