import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

/*

- OuterScrollablePanel is horizontal scrolling , 
  InnerScrollablePanel is vertical scrolling

- Set OuterScrollablePanel and InnerScrollablePanel's `scroller` to `false,
  to disable scroller

- Set OuterScrollablePanel's `panel.mask.updateMode` to `'everyTick'`, 
  to update masked game object every tick.

- Set InnerScrollablePanel's `panel.mask` to `false`, 
  to disable mask feature in InnerScrollablePanel

- Don't assign InnerScrollablePanel's `header` and `footer` elements.

- Set InnerScrollablePanel's `space.top` and `space.bottom` to `0`

- Set Sizer of InnerScrollablePanels `space.top` and `space.bottom` to `0`.

*/


const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var itemCountArray = [30, 30, 40, 20, 10, 0, 10, 30];
        var topSizer = CreateOuterScrollablePanel(this, itemCountArray)
            .setPosition(400, 300)
            .layout()

    }

    update() { }
}

var CreateOuterScrollablePanel = function (scene, itemCountArray) {
    return scene.rexUI.add.scrollablePanel({
        width: 500,

        scrollMode: 'x',

        background: scene.rexUI.add.roundRectangle({
            strokeColor: COLOR_PRIMARY,
            strokeWidth: 5,
        }),

        panel: {
            child: CreateInnerScrollablePanelGroup(scene, itemCountArray),
            mask: {
                padding: 2,
                updateMode: 'everyTick'
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
        },
    })
}

var CreateInnerScrollablePanelGroup = function (scene, itemCountArray) {
    var sizer = scene.rexUI.add.sizer({
        height: 420,

        orientation: 'x',
        space: {
            left: 10, right: 10,
            top: 0, bottom: 0,
            // IMPORTANT: No top and bottom space
            item: 20
        }
    })
        .addBackground(
            scene.rexUI.add.roundRectangle({
            }),
            'background'
        )

    for (var i = 0, cnt = itemCountArray.length; i < cnt; i++) {
        sizer.add(
            CreateInnerScrollablePanel(scene, `Panel ${i}`, itemCountArray[i]),
            { proportion: 0, expand: true }
        )
    }

    return sizer;
}

var CreateInnerScrollablePanel = function (scene, header, itemCount) {
    return scene.rexUI.add.scrollablePanel({
        width: 150,

        scrollMode: 'y',

        background: scene.rexUI.add.roundRectangle({
            radius: 20,
            strokeColor: COLOR_DARK
        }),

        panel: {
            child: CreateInnerPanel(scene, itemCount),
            mask: false,
            // IMPORTANT: Disable mask
        },

        // IMPORTANT: No header element

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
            left: 10, right: 10,
            top: 0, bottom: 0,
            // IMPORTANT: No top and bottom space

            panel: 10,
            header: 10,
        },

        name: 'innerPanelTop'
        // To get this scrollable panel back later
    })
}

var CreateInnerPanel = function (scene, itemCount) {
    if (itemCount === undefined) {
        itemCount = 0;
    }

    var sizer = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 6, right: 6, top: 6, bottom: 6, item: 6 },
    })

    for (var i = 0; i < itemCount; i++) {
        sizer.add(
            CreateLabel(scene, i.toString()),
            { expand: true }
        );
    }
    return sizer;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_PRIMARY
        }),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'center',
        space: {
            left: 5,
            right: 5,
            top: 5,
            bottom: 5,
        },

    })
}

var CreateHeader = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            color: COLOR_LIGHT
        }),

        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        align: 'left',
        space: {
            left: 5, right: 5, top: 5, bottom: 5,
        },

    })
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: Demo,
    plugins: {
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);