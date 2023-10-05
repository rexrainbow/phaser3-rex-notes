const GetValue = Phaser.Utils.Objects.GetValue;

export default function (colors) {
    var COLOR_PRIMARY = GetValue(colors, 'primary', 0x424242);
    var COLOR_LIGHT = GetValue(colors, 'light', 0x6d6d6d);
    var COLOR_DARK = GetValue(colors, 'dark', 0x1b1b1b);

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

                list: {
                    label: {
                        space: { left: 5, right: 5 },
                        background: {
                            color: COLOR_DARK,
                        },
                    },
                    button: {
                        space: { left: 5, right: 5, top: 8, bottom: 8 },
                        background: {
                            color: COLOR_DARK,
                            strokeColor: COLOR_LIGHT,

                            'hover.color': COLOR_LIGHT,
                        },
                    },
                },

                button: {
                    space: { left: 8, right: 8, top: 8, bottom: 8 },
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_LIGHT,
                        'active.color': COLOR_LIGHT,
                    },
                },

                checkbox: {
                    color: COLOR_LIGHT,
                    boxStrokeColor: COLOR_DARK,
                    uncheckedColor: COLOR_DARK,
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

            folder: {
                space: {
                    left: 10, right: 0, top: 5, bottom: 5, item: 3
                },

                title: {
                    background: { color: COLOR_DARK },

                    expandedIcon: {
                        color: COLOR_PRIMARY,
                    },
                },

                background: {
                    strokeColor: COLOR_DARK
                },

            },

            tab: {
                tab: {
                    space: { left: 3, right: 3, top: 3, bottom: 3 },
                    background: {
                        color: COLOR_DARK,
                        strokeColor: COLOR_PRIMARY,
                        'active.color': COLOR_PRIMARY,
                    },

                },

                tabs: {
                    space: { item: 3 }
                },

                pages: {
                    fadeIn: 300
                },
            },

            separator: {
                height: 5,
                color: COLOR_DARK
            },

        }
    }
}