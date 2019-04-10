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

    preload() { }

    create() {
        var config = {
            x: 400,
            y: 300,
            width: 400,
            height: 400,
            orientation: 'x',

            keys: ['Table', 'Text'],
        };
        var mainPanel = CreateMainPanel(this, config)
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);


        mainPanel.getElement('pages')
            .on('pageinvisible', function (page, key, pages) {
                console.log('Set page \'' + key + '\' invisible');
            })
            .on('pagevisible', function (page, key, pages) {
                console.log('Set page \'' + key + '\' visible');
            });

        mainPanel.getElement('buttons').emitButtonClick(0);
    }

    update() { }
}

var CreateMainPanel = function (scene, config) {
    var keys = GetValue(config, 'keys', []);
    var buttons = CreateButtons(scene, keys);
    var pages = CreatePages(scene, keys);
    var mainPanel = scene.rexUI.add.sizer(config)
        .add(
            buttons, //child
            0, // proportion
            'top', // align
            0, // paddingConfig
            false, // expand
        )
        .add(
            pages, //child
            1, // proportion
            'center', // align
            0, // paddingConfig
            true, // expand
        );

    var prevButton = undefined;
    buttons.on('button.click', function (button) {
        if (button === prevButton) {
            return;
        }
        button.getElement('background').setFillStyle(COLOR_PRIMARY);
        if (prevButton) {
            prevButton.getElement('background').setFillStyle(COLOR_DARK);
        }
        prevButton = button;

        pages.swapPage(button.text);
    });

    mainPanel.addChildrenMap('buttons', buttons);
    mainPanel.addChildrenMap('pages', pages);
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
        orientation: 'y', // Left-right
    })
}

var CreatePages = function (scene, keys) {
    var pages = scene.rexUI.add.pages()
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 10, 10, 0, COLOR_PRIMARY)
        );

    var createPageCallback = {
        Table: CreateTablePage,
        Text: CreateTextPage,
    }
    var key;
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        pages.addPage(
            createPageCallback[key](scene), // game object
            key, // key
            'left-top', // align
            10, // padding
            true, // extend
        )
    }
    return pages;
}

var CreateTablePage = function (scene) {
    return scene.rexUI.add.gridTable({
        table: {
            cellHeight: 60,
            columns: 2,
            mask: {
                padding: 2,
            }
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

var CreateTextPage = function (scene) {
    return scene.rexUI.add.textArea({
        // text: this.add.text(),
        text: scene.rexUI.add.BBCodeText(),

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },

        content: CreateContent(10000),
    })
}

var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
var CreateContent = function (linesCount) {
    var numbers = [];
    for (var i = 0; i < linesCount; i++) {
        numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
    }
    return content + '\n' + numbers.join('\n');
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