import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const GetValue = Phaser.Utils.Objects.GetValue;
const Random = Phaser.Math.Between;

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
            width: 500,
            height: 400,
            orientation: 'x',

            keys: ['DTable', 'Text', 'STable'],
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
        DTable: CreateDTablePage,
        Text: CreateTextPage,
        STable: CreateSTablePage,
    }
    var key;
    for (var i = 0, cnt = keys.length; i < cnt; i++) {
        key = keys[i];
        pages.addPage(
            createPageCallback[key](scene), // game object
            key, // key
            'left-top', // align
            20, // padding
            true, // extend
        )
    }
    return pages;
}

var CreateDTablePage = function (scene) {
    var GetItems = function (count) {
        var data = [];
        for (var i = 0; i < count; i++) {
            data.push({
                id: i,
                color: Random(0, 0xffffff)
            });
        }
        return data;
    }

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
        items: GetItems(100)
    })
}

var CreateTextPage = function (scene) {
    var content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;
    var CreateContent = function (linesCount) {
        var numbers = [];
        for (var i = 0; i < linesCount; i++) {
            numbers.push('[color=' + ((i % 2) ? 'green' : 'yellow') + ']' + i.toString() + '[/color]');
        }
        return content + '\n' + numbers.join('\n');
    }

    return scene.rexUI.add.textArea({
        // text: this.add.text(),
        text: scene.rexUI.add.BBCodeText(),

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },

        space: {
            text: 10,
        },

        content: CreateContent(10000),
    })
}

var CreateSTablePage = function (scene) {
    var CreateItem = function (scene, colIdx, rowIdx) {
        var text = colIdx + ',' + rowIdx;
        return scene.rexUI.add.label({
            height: 60,

            background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, undefined)
                .setStrokeStyle(2, COLOR_LIGHT, 1),
            text: scene.add.text(0, 0, text, {
                fontSize: 18
            }),
            icon: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 10, Random(0, 0xffffff)),
            space: {
                left: 10,
                right: 10,
                top: 10,
                bottom: 10,

                icon: 10,
            }
        });
    }

    var CreateGrid = function (scene, col, row) {
        var sizer = scene.rexUI.add.gridSizer({
            column: col,
            row: row,

            columnProportions: 1,
        })
        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {
                sizer.add(
                    CreateItem(scene, i, j), // child
                    i, // columnIndex
                    j, // rowIndex
                    'center', // align
                    0, // paddingConfig
                    true, // expand
                )
            }
        }

        return sizer;
    }

    return scene.rexUI.add.scrollablePanel({
        scrollMode: 0,

        panel: {
            child: CreateGrid(scene, 3, 20),
            mask: {
                mask: true,
                padding: 1,
            }
        },

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
            thumb: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
        },

        space: {
            panel: 10,
        }
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