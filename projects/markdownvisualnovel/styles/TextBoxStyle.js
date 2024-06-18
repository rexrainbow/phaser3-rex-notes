import { COLOR_MAIN, COLOR_DARK, COLOR_LIGHT } from './Colors.js';

export default {
    space: {
        innerLeft: 20, innerRight: 20, innerTop: 20, innerBottom: 20,

        titleLeft: 40,
        icon: 10, text: 10,
    },

    innerBackground: { color: COLOR_MAIN, strokeColor: COLOR_LIGHT, strokeWidth: 2, radius: 20, },

    icon: { width: 120, height: 120 },

    action: { width: 40, height: 40, animationMode: 'ball' },

    text: { fontSize: 30, maxLines: 4 },

    title: {
        $type: 'label',

        width: 200,
        space: {
            left: 10, right: 10, top: 10, bottom: 10,
            icon: 10,
            text: 10,
        },

        background: {
            radius: { tl: 10, tr: 10 },
            color: COLOR_DARK,
            strokeColor: COLOR_LIGHT, strokeWidth: 2
        },
        text: { fontSize: 36 },

        icon: null,
        action: null,

        align: 'center',
        alpha: 0,
    },

    align: {
        action: 'bottom'
    }
};