const GetValue = Phaser.Utils.Objects.GetValue;

export default function (colors) {
    var COLOR_PRIMARY = GetValue(colors, 'primary', 0x424242);
    var COLOR_LIGHT = GetValue(colors, 'light', 0x6d6d6d);
    var COLOR_DARK = GetValue(colors, 'darl', 0x1b1b1b);

    return {
        width: 240,

        styles: {
            space: {
                left: 10, right: 10, top: 10, bottom: 10
            },

            background: {
                radius: 10,
                color: 0x0,
                strokeColor: 0xffffff,
            },

            inputRow: {
                height: 30,
                space: {
                    top: 5, bottom: 5,
                    title: 20
                },

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

                colorInput: {
                    colorPicker: {
                        background: { color: 0x0, strokeColor: COLOR_LIGHT },
                    },

                    space: {
                        item: 8
                    }
                },

                proportion: {
                    title: 0, inputField: 1,
                    range: { slider: 3, inputText: 2, }
                }
            },

        }
    }
}