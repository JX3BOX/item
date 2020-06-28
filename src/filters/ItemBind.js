/**
 * ItemBind
 * @param {*} BindType 绑定类型
 */

export default (BindType) => {
    return BindType === 2
        ? '装备后绑定'
        : BindType === 3
            ? '拾取后绑定'
            : ''
}

