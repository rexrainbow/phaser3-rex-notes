import { COLOR_MAIN, COLOR_DARK, COLOR_LIGHT } from './Colors.js';

export default {
    space: {
        // left: 10, right: 10, top: 10, bottom: 10,
        separator: 2,
        titleLeft: 40, titleRight: 20,
        textLeft: 20, textRight: 40
    },

    // background: { color: COLOR_DARK, strokeColor: COLOR_LIGHT, strokeWidth: 2, radius: 10, },

    icon: null,

    action: null,

    separator: { color: COLOR_LIGHT, height: 10 },

    text: { fontSize: 24 },

    title: { fontSize: 30 },

    align: {
        title: 'right',
        text: 'left'
    }
};