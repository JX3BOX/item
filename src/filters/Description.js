/**
 * 剑三描述 转 纯描述
 *
 * @param {*} description 剑三描述
 */

export default (description) => {
    if(!description) return '';

    let output = '';
    let matchs = description.match(/text="(.*?)(\\\\\\n)?"/ig);
    for (let i in matchs) {
        let ms = /text="((.*?)(\\\\\\n)?)"/ig.exec(matchs[i]);
        if (ms && ms.length > 1) matchs[i] = ms[1].trim();
        if (matchs[i]) output += matchs[i].replace(/\\n/g, "<br>").replace(/\\\\/g, '');
    }
    return output;
}

