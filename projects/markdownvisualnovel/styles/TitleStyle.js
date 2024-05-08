import { COLOR_MAIN, COLOR_DARK, COLOR_LIGHT } from './Colors.js';

export default {
    space: {
        left: 10, right: 10, top: 10, bottom: 10,
        separator: 2,
    },

    background: { color: COLOR_DARK, strokeColor: COLOR_LIGHT, strokeWidth: 2, radius: 10, },

    icon: null,

    action: null,

    separator: { color: COLOR_LIGHT, originX: 0, originY: 0.5 },

    text: { fontSize: 24, originX: 1, originY: 0 },

    title: { fontSize: 30, originX: 1, originY: 1 },

    align: {
        title: 'right',
        text: 'left'
    }
};