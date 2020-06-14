/**
 * IconID 转 URL
 *
 * @param {*} icon_id IconID
 */
const {JX3BOX} = require("@jx3box/jx3box-common");

export default (icon_id) => {
    if (isNaN(parseInt(icon_id))) {
        return `${JX3BOX.__ossMirror}image/common/nullicon.png`;
    } else {
        return `${JX3BOX.__ossMirror}icon/${icon_id}.png`;
    }
}

