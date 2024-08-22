import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })

    }

    preload() {
    }

    create() {
        this.input.topOnly = false;
        var scrollablePanel = this.rexUI.add.scrollablePanel({
            x: 400,
            y: 300,
            height: 300,

            scrollMode: 'y',

            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 10, COLOR_MAIN),

            panel: {
                child: CreatePanel(this),

                mask: {
                    padding: 1,
                },
            },

            slider: {
                track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
            },

            scroller: {
                // pointerOutRelease: false,
            },

            mouseWheelScroller: {
                focus: false,
                speed: 0.1
            },

            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                panel: 10,
                // slider: { left: 30, right: 30 },
            }
        })
            .layout();

    }

    update() { }
}

var CreatePanel = function (scene) {
    return scene.rexUI.add.sizer({
        width: 200,
        orientation: 'y'
    })
        .add(
            CreateFolder(scene, 'FolderA', ['AA0', 'BB0', 'CC0', 'DD0']),
            { expand: true }
        )
        .add(
            CreateFolder(scene, 'FolderB', ['AA1', 'BB1', 'CC1', 'DD1']),
            { expand: true }
        )
        .add(
            CreateFolder(scene, 'FolderC', ['AA2', 'BB2', 'CC2', 'DD2']),
            { expand: true }
        )
        .add(
            CreateFolder(scene, 'FolderD', ['AA3', 'BB3', 'CC3', 'DD3']),
            { expand: true }
        )
        .add(
            CreateFolder(scene, 'FolderE', ['AA4', 'BB4', 'CC4', 'DD4']),
            { expand: true }
        )
}

var CreateFolder = function (scene, folderName, buttonNames) {
    return scene.rexUI.add.folder({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0).setStrokeStyle(2, COLOR_LIGHT),

        child: CreateFolderChild(scene, buttonNames),
        title: CreateLabel(scene, folderName),

        transition: {
            // duration: 200,
        },

        expand: {
            title: false,
            child: true,
        },

        space: {
            left: 10, right: 10, top: 10, bottom: 10, item: 3
        },
        expanded: false,
    })
        .on('expand.start', function (folder) {
            console.log(`Expand ${folderName}`)
            folder.getElement('background').setFillStyle()
        })
        .on('collapse.start', function (folder) {
            console.log(`Collapse ${folderName}`)
        })
        .on('collapse.complete', function (folder) {
            folder.getElement('background').setFillStyle(COLOR_DARK)
        })
        // .expand(0)
        .collapse(0)

}

var CreateFolderChild = function (scene, buttonNames) {
    var child = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { item: 3 }
    })

    for (var i = 0, cnt = buttonNames.length; i < cnt; i++) {
        child.add(
            CreateLabel(scene, buttonNames[i]),
            { expand: true }
        )
    }
    return child;
}

var CreateLabel = function (scene, text) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0).setStrokeStyle(2, COLOR_LIGHT),
        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),
        space: {
            left: 10, right: 10, top: 10, bottom: 10
        }
    });
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