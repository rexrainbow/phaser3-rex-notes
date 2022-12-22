import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
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
        var folderA = CreateFolder(this, 'y', 'FolderA', ['AA0', 'BB0', 'CC0', 'DD0'])
            .setPosition(200, 200)
            .layout();

        var folderB = CreateFolder(this, 'x', 'B', ['AA0', 'BB0', 'CC0', 'DD0'])
            .setPosition(400, 200)
            .layout();
    }

    update() { }
}

var CreateFolder = function (scene, orientation, folderName, buttonNames) {
    var child = CreateChildPanel(scene, buttonNames);

    var title = CreateLabel(scene, folderName);

    return scene.rexUI.add.folder({
        orientation: orientation,

        title: title.setDraggable(),
        child: child,

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
        .setOrigin(0)
        .expand(0)
    //.collapse(0)

}

var CreateChildPanel = function (scene, buttonNames) {
    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
        width: 140,
        space: { left: 8, right: 8, top: 8, bottom: 8, item: 1 }
    })
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, COLOR_DARK).setStrokeStyle(2, COLOR_LIGHT)
        )

    for (var i = 0, cnt = buttonNames.length; i < cnt; i++) {
        panel.add(
            CreateLabel(scene, buttonNames[i]),
            { expand: true }
        )
    }

    return panel;
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