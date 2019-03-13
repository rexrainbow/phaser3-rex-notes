import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;


class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var keys = ['Table', 'Label'];
        var mainPanel = CreateMainPanel(this, keys)
            .setPosition(400, 300)
            .layout();
    }

    update() {}
}

var CreateMainPanel = function (scene, keys) {
    var buttons = CreateButtons(scene, keys);
    var pages = CreatePages(scene, keys);
    var mainPanel = scene.rexUI.add.sizer({
            orientation: 'y',
        }).add(
            buttons, //child
            0, // proportion
            'left', // align
            0, // paddingConfig
            false, // expand
        )
        .add(
            pages, //child
            0, // proportion
            'center', // align
            0, // paddingConfig
            false, // expand
        );

    var prevButton = undefined;
    buttons.on('button.click', function (button) {
        button.getElement('background').setFillStyle(COLOR_PRIMARY);
        if (prevButton) {
            prevButton.getElement('background').setFillStyle(COLOR_DARK);
        }
        prevButton = button;

        pages.swapPage(button.text);
    });

    buttons.emitButtonClick(0);
    return mainPanel;
}

var CreateButtons = function (scene, keys) {
    var buttons = [];
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        buttons.push(scene.rexUI.add.label({
            background: scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_DARK),
            text: scene.add.text(0, 0, keys[i], {
                fontSize: '18pt'
            }),
            space: {
                top: 5,
                left: 10,
                right: 10,
                bottom: 2,
            }
        }));
    }
    return scene.rexUI.add.buttons({
        buttons: buttons,
        orientation: 0, // Left-right
    })
}

var CreatePages = function (scene, keys) {
    var pages = scene.rexUI.add.pages()
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY)
        )

    var createPageCallback = {
        Table: CreateTablePage,
        Label: CreateLabelPage,
    }
    var key;
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        pages.addPage(
            createPageCallback[key](scene), // game object
            key, // key
            'left-top', // align
            10, // padding
            false, // extend
        )
    }
    return pages;
}

var CreateTablePage = function (scene) {
    return scene.rexUI.add.gridTable({
        table: {
            width: 250,
            height: 400,

            cellWidth: 120,
            cellHeight: 60,
            columns: 2,
        },

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },

        space: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20,

            table: 10,
        },

        createCellContainerCallback: function (cell) {
            var scene = cell.scene,
                width = cell.width,
                height = cell.height,
                item = cell.item,
                index = cell.index;
            return scene.rexUI.add.label({
                    width: width,
                    height: height,

                    background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_LIGHT),
                    icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, item.color),
                    text: scene.add.text(0, 0, item.id),

                    space: {
                        icon: 10,
                        left: 15
                    }
                })
                .setOrigin(0);
        },
        items: getItems(100)
    })
}

var getItems = function (count) {
    var data = [];
    for (var i = 0; i < count; i++) {
        data.push({
            id: i
        });
    }
    return data;
}

var CreateLabelPage = function (scene) {
    return scene.rexUI.add.label({
        text: scene.add.text(0, 0, 'Label', {
            fontSize: '18pt'
        }),
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