import { COLOR_MAIN, COLOR_DARK, COLOR_LIGHT } from './Colors.js';

export default {
    space: {
        left: 20, right: 20, top: 20, bottom: 20,
        item: 20,
        firstName: 20, firstNameTitle: 10, lastNameTitle: 10,
    },

    background: { color: COLOR_MAIN, strokeColor: COLOR_LIGHT, radius: 20, },

    title: {
        space: { left: 5, right: 5, top: 5, bottom: 5 },
        text: { fontSize: 40 },
        wrapText: 'word',
        background: {
            // color: COLOR_DARK
        }
    },

    layoutMode: 0,

    nameTitle: {
    },

    nameInput: {
        background: {
            color: COLOR_DARK,
            'focus.color': 0x0,
        },
        style: {
            fontSize: 36,
            backgroundBottomY: 4,
            backgroundHeight: 36,
            'cursor.color': 'black',
            'cursor.backgroundColor': 'white',
        },
    },

    button: {
        space: { left: 5, right: 5, top: 5, bottom: 5 },

        background: {
            color: COLOR_DARK,
            radius: 5,
            'hover.strokeColor': 0xffffff,
        },

        text: { fontSize: 36 },
    },

    proportion: {
        firstNameTitle: 1,
        lastNameTitle: 1,
    },

    align: {
        // actions: 'right'
    },

    modal: {
        cover: { color: 0xff0000, alpha: 0.3 }
    }
}