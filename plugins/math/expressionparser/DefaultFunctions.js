export default {
    round: Math.round,
    floor: Math.floor,
    ceil: Math.ceil,
    abs: Math.abs,
    min: Math.min,
    max: Math.max,
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },
}