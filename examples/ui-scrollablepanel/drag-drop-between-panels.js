import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import DragPlugin from '../../plugins/drag-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {

    }

    create() {
        var panel0 = CreateScrollablePanel(this, 30).setPosition(200, 300).layout();
        var panel1 = CreateScrollablePanel(this, 10).setPosition(400, 300).layout();
        var panel2 = CreateScrollablePanel(this, 1).setPosition(600, 300).layout();

        var panels = [panel0, panel1, panel2];
        panels.forEach(function (panel) {
            SetDragable(panel);
        })
    }

    update() { }
}

var CreateScrollablePanel = function (scene, itemCount) {
    return scene.rexUI.add.scrollablePanel({
        width: 150, height: 420,

        scrollMode: 'y',

        background: scene.rexUI.add.roundRectangle({
            radius: 20,
            strokeColor: COLOR_DARK
        }),

        panel: {
            child: CreatePanel(scene, itemCount),
            mask: {
                padding: 2,
            },
            enableLayer: true,
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

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            panel: 10,
        }
    })
}

var CreatePanel = function (scene, itemCount) {
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
            {
                expand: true
            }
        );
    }
    return sizer;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            radius: 10,
            color: COLOR_LIGHT
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

var SetDragable = function (scrollablePanel) {
    var scene = scrollablePanel.scene;
    var dragBehavior = scene.plugins.get('rexDrag');
    scrollablePanel
        .setChildrenInteractive({
            targets: [
                scrollablePanel.getElement('panel'),
            ]
        })
        .on('child.pressstart', function (child) {
            if (!child.drag) {
                child.drag = dragBehavior.add(child);
                child
                    .on('dragstart', function (pointer, dragX, dragY) {
                        // Save start position
                        child.setData({ startX: child.x, startY: child.y });
                    })
                    .on('dragend', function (pointer, dragX, dragY, dropped) {
                        if (dropped) { // Process 'drop' event
                            return;
                        }

                        // Back to start position if not dropping on another panel
                        child.moveTo({
                            x: child.getData('startX'), y: child.getData('startY'),
                            speed: 300
                        });
                    })
            }

            child.setDepth(1);
            child.drag.setEnable(true).drag();
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
        global: [{
            key: 'rexDrag',
            plugin: DragPlugin,
            start: true
        }],
        scene: [{
            key: 'rexUI',
            plugin: UIPlugin,
            mapping: 'rexUI'
        }]
    }
};

var game = new Phaser.Game(config);