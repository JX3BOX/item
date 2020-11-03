/**
 * ItemAttributePercent
 * @param {*} type 物品属性类型
 * @param {*} value 物品属性值
 */

export default (type, value) => {
    let label = '';
    switch (type) {
        case 'atAllTypeCriticalStrike':
        case 'atLunarCriticalStrike':
        case 'atMagicCriticalStrike':
        case 'atNeutralCriticalStrike':
        case 'atPhysicsCriticalStrike':
        case 'atPoisonCriticalStrike':
        case 'atSolarAndLunarCriticalStrike':
        case 'atSolarCriticalStrike':
            label = `+${(value / 35737.5 * 100).toFixed(2)}%`;
            break;
        case 'atAllTypeCriticalDamagePowerBase':
        case 'atLunarCriticalDamagePowerBase':
        case 'atMagicCriticalDamagePowerBase':
        case 'atNeutralCriticalDamagePowerBase':
        case 'atPhysicsCriticalDamagePowerBase':
        case 'atPoisonCriticalDamagePowerBase':
        case 'atSolarAndLunarCriticalDamagePowerBase':
        case 'atSolarCriticalDamagePowerBase':
            label = `+${(value / 12506.25 * 100).toFixed(2)}%`;
            break;
        case 'atToughnessBase':
            label = `+${(value / 35737.5 * 100).toFixed(2)}% +${(value / 9588.75 * 100).toFixed(2)}%会心减害`;
            break;
        case 'atDecriticalDamagePowerBase':
            label = `+${(value / 5175 * 100).toFixed(2)}%`;
            break;
        case 'atAllTypeHitValue':
        case 'atLunarHitValue':
        case 'atMagicHitValue':
        case 'atNeutralHitValue':
        case 'atPhysicsHitValue':
        case 'atPoisonHitValue':
        case 'atSolarAndLunarHitValue':
        case 'atSolarHitValue':
            label = `+${(value / 25991.25 * 100).toFixed(2)}%`;
            break;
        case 'atDodge':
            label = `+${(value / 17355 * 100).toFixed(2)}%`;
            break;
        case 'atParryBase':
            label = `+${(value / 16293.75 * 100).toFixed(2)}%`;
            break;
        case 'atStrainBase':
            label = `+${(value / 34458.75 * 100).toFixed(2)}%`;
            break;
        case 'atPhysicsDefenceAdd':
        case 'atPhysicsShieldAdditional':
        case 'atPhysicsShieldBase':
            label = `+${(value / 19091.25 * 100).toFixed(2)}%`;
            break;
        case 'atLunarMagicShieldBase':
        case 'atMagicShield':
        case 'atNeutralMagicShieldBase':
        case 'atPoisonMagicShieldBase':
        case 'atSolarMagicShieldBase':
            label = `+${(value / 19091.25 * 100).toFixed(2)}%`;
            break;
        case 'atLunarOvercomeBase':
        case 'atMagicOvercome':
        case 'atNeutralOvercomeBase':
        case 'atPhysicsOvercomeBase':
        case 'atPoisonOvercomeBase':
        case 'atSolarAndLunarOvercomeBase':
        case 'atSolarOvercomeBase':
            label = `+${(value / 35737.5 * 100).toFixed(2)}%`;
            break;
        case 'atHasteBase':
            label = `+${(value / 43856.25 * 100).toFixed(2)}%`;
            break;
        case 'atSurplusValueBase':
            label = `+${(value / 60435 * 100).toFixed(2)}%`;
            break;
        default:
            break;
    }
    return label ? ` (${label})` : '';
}

