const COLOR_PRIMARY = 0x424242;
const COLOR_LIGHT = 0x6d6d6d;
const COLOR_DARK = 0x1b1b1b;

export default {
    width: 200,

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
                space: {
                    left: 5, right: 5
                }
            },

            inputText: {
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

            slider: {
                track: {
                    color: COLOR_DARK,
                    width: 8, height: 8,
                },
                indicator: {
                    color: COLOR_PRIMARY,
                    width: 8, height: 8,
                },
                thumb: {
                    color: COLOR_LIGHT,
                    width: 16, height: 16,
                },
            },

            space: {
                top: 5, bottom: 5,
            },

            proportion: {
                title: 0, inputField: 1,
                range: { slider: 3, inputText: 2, }
            }
        },

        space: {
            left: 10, right: 10, top: 10, bottom: 10
        }
    }
}