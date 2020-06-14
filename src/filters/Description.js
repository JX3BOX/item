/**
 * 剑三描述 转 纯描述
 *
 * @param {*} description 剑三描述
 */

export default (description) => {
    let matchs = /text="(.*?)(\\\\\\n)?"/.exec(description);
    if (matchs && matchs.length > 1) description = matchs[1].trim();
    if (description) description = description.replace(/\\n/g, "<br>");
    return description;
}

