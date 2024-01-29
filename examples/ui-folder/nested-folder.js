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
        var folderA = CreateFolder(this, {
            title: 'FolderA',
            children: [
                {
                    title: 'FolderB',
                    children: [
                        {
                            title: 'FolderC',
                            children: ['AAAA', 'BBBB'],
                        },
                        'BBB'
                    ]
                },
                'BB',
                'CC'
            ],
        })
            .setMinWidth(300)
            .setPosition(200, 100)
            .layout();
    }

    update() { }
}

var CreateFolder = function (scene, { title, children }) {
    return scene.rexUI.add.folder({
        orientation: 'y',

        child: CreateFolderChild(scene, children),
        title: CreateLabel(scene, title, COLOR_MAIN),
        toggleClickConfig: {
            threshold: 10,
        },

        transition: {
            // duration: 200,
        },

        expand: {
            title: true,
            child: true,
        },

        space: {
            childLeft: 30,
        },
    })
        .setOrigin(0)
        .expand(0)

}

var CreateFolderChild = function (scene, children) {
    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
    })

    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (typeof (child) === 'string') {
            child = CreateLabel(scene, child, COLOR_DARK);
        } else {
            child = CreateFolder(scene, child);
        }

        panel.add(child, { expand: true });
    }

    return panel;
}

var CreateLabel = function (scene, text, backgroundColor) {
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, backgroundColor).setStrokeStyle(2, COLOR_LIGHT),
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