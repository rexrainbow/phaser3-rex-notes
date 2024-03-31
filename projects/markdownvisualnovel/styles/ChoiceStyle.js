import { COLOR_MAIN, COLOR_DARK, COLOR_LIGHT } from './Colors.js';

export default {
    space: {
        left: 20, right: 20, top: 20, bottom: 20,
        title: 20,
        content: 30,
        choices: 30, choice: 10,
    },

    background: { color: COLOR_MAIN, strokeColor: COLOR_LIGHT, radius: 20, },

    title: {
        space: { left: 5, right: 5, top: 5, bottom: 5 },
        text: {
            fontSize: 24
        },
        background: {
            color: COLOR_DARK
        }
    },

    content: {
        space: { left: 5, right: 5, top: 5, bottom: 5 },
        text: {
            fontSize: 20
        },
    },

    choicesType: 'radio',
    choice: {
        space: { left: 10, right: 10, top: 10, bottom: 10 },
        background: {
            color: COLOR_DARK,
            strokeWidth: 0,
            radius: 10,

            'hover.strokeColor': 0xffffff,
            'hover.strokeWidth': 2,
            'active.color': COLOR_LIGHT,
        }
    },

    align: {
        actions: 'right'
    },
}