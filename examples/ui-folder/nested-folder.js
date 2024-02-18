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
        var print = this.add.text(0, 0, '');
        var clickCallback = function (item) {
            print.text += `Click ${item.text}\n`
        }

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
        }, clickCallback)
            .setMinWidth(300)
            .setPosition(200, 100)
            .layout();
    }

    update() { }
}

var CreateFolder = function (scene, { title, children }, clickCallback) {
    var child = CreateFolderChild(scene, children, clickCallback);

    var title = CreateTitle(scene, title, COLOR_MAIN, clickCallback)
        .on('folder.expand', function (folder) {
            title.getElement('toggleTarget').setDirection('down')
        })
        .on('folder.collapse', function (folder) {
            title.getElement('toggleTarget').setDirection('right')
        })

    return scene.rexUI.add.folder({
        orientation: 'y',

        child: child,
        title: title,
        toggleByTarget: title.getElement('toggleTarget'),
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

var CreateFolderChild = function (scene, children, clickCallback) {
    var panel = scene.rexUI.add.sizer({
        orientation: 'y',
    })

    for (var i = 0, cnt = children.length; i < cnt; i++) {
        var child = children[i];
        if (typeof (child) === 'string') {
            child = CreateItem(scene, child, COLOR_DARK, clickCallback);
        } else {
            child = CreateFolder(scene, child, clickCallback);
        }

        panel.add(child, { expand: true });
    }

    return panel;
}

var CreateTitle = function (scene, text, backgroundColor, clickCallback) {
    var title = scene.rexUI.add.sizer({
        orientation: 'x',
        space: {
            left: 10, right: 10, top: 10, bottom: 10, item: 5
        }
    })
        .addBackground(scene.rexUI.add.roundRectangle({
            color: backgroundColor,
            strokeColor: COLOR_LIGHT,
            strokeWidth: 2
        }))
        .add(scene.rexUI.add.triangle({
            color: COLOR_LIGHT,
            padding: 2
        }), { fitRatio: 1, key: 'toggleTarget' })
        .add(
            scene.rexUI.add.label({
                text: scene.add.text(0, 0, text, {
                    fontSize: 18
                }),
            }),
            { proportion: 1, key: 'item' }
        );

    var item = title.getElement('item');
    item.onClick(function () {
        clickCallback(item)
    });

    return title;
}

var CreateItem = function (scene, text, backgroundColor, clickCallback) {
    var item = scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle({
            color: backgroundColor,
            strokeColor: COLOR_LIGHT,
            strokeWidth: 2
        }),

        text: scene.add.text(0, 0, text, {
            fontSize: 18
        }),

        space: {
            left: 10, right: 10, top: 10, bottom: 10
        }
    })
        .onClick(function () {
            clickCallback(item)
        });

    return item;
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