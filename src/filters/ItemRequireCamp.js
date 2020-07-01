/**
 * ItemRequireCamp
 * @param {*} RequireCamp 阵营ID
 */

export default (RequireCamp) => {
    switch (RequireCamp) {
        case 0:
            return '未知';
        case 1:
            return '未知';
        case 2:
            return '未知';
        case 3 :
            return '未知';
        case 4:
            return '未知';
        case 5:
            return '未知';
        case 6:
            return '未知';
        case 7:
            return '无限制';
        default:
            return '未知'
    }
}

