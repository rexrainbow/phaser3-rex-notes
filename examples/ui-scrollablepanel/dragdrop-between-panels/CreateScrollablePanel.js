var CreateScrollablePanel = function (scene, childCallback) {
    return scene.rexUI.add.scrollablePanel({
        width: 150, height: 420,

        scrollMode: 'y',

        background: scene.rexUI.add.roundRectangle({
            radius: 20,
            strokeColor: COLOR_DARK
        }),

        panel: {
            child: childCallback(),
            mask: {
                padding: 2,
            },
        },

        slider: {
            track: scene.rexUI.add.roundRectangle({
                width: 20,
                radius: 10,
                color: COLOR_DARK
            }),
            thumb: scene.rexUI.add.roundRectangle({
                radius: 13,
                color: COLOR_LIGHT
            }),
        },

        scroller: false,

        space: {
            left: 10, right: 10, top: 10, bottom: 10,

            panel: 10,
            header: 10,
        },

        name: 'panelTop'
        // To get this scrollable panel back later
    })
}

export default CreateScrollablePanel;