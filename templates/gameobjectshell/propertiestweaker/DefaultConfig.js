const COLOR_PRIMARY = 0x424242;
const COLOR_LIGHT = 0x6d6d6d;
const COLOR_DARK = 0x1b1b1b;

export default {
    styles: {
        background: {
            radius: 10,
            color: 0x0,
            strokeColor: 0xffffff,
        },

        inputRow: {
            background: {
                strokeColor: COLOR_PRIMARY
            },

            title: {
                iconSize: 30,
                space: { icon: 2 }
            },

            inputText: {
                width: 200,
                background: {
                    color: COLOR_DARK
                },
                focusStyle: {
                    color: COLOR_PRIMARY,
                },
                style: {
                    backgroundBottomY: 4,
                    backgroundHeight: 18,
                },
                cursorStyle: {
                    color: 'black',
                    backgroundColor: 'white',
                }
            },
        },

        space: {
            left: 10, right: 10, top: 10, bottom: 10
        }
    }
}