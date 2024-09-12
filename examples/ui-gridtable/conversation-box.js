import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

const Clone = Phaser.Utils.Objects.Clone;

class ConversationBox extends RexPlugins.UI.Sizer {
    constructor(scene, config) {
        if (config === undefined) {
            config = {};
        }
        config.orientation = 'x';
        super(scene, config);

        this.messages = [];

        var background = CreateBackground(scene, config.background);
        this.addBackground(background);

        var labelConfig = (config.label) ? Clone(config.label) : {};
        labelConfig.orientation = 'y';

        var labelA = CreateLabel(scene, labelConfig);
        this.add(labelA, { key: 'labelA' });

        var tableConfig = (config.messages) ? Clone(config.messages) : {};
        var table = CreateTable(scene, tableConfig);
        this.add(
            table,
            { proportion: 1, expand: true, key: 'messages' }
        );

        var labelB = CreateLabel(scene, labelConfig);
        this.add(labelB, { key: 'labelB' });
    }

    setLabelA(config) {
        this.getElement('labelA').resetDisplayContent(config);
        return this;
    }

    setLabelB(config) {
        this.getElement('labelB').resetDisplayContent(config);
        return this;
    }

    clearAllMessages() {
        this.messages.length = 0;
        var table = this.getElement('messages');
        table.setItems(this.messages);
        return this;
    }

    appendMessage(config) {
        this.messages.push({
            text: config.text,
            align: config.align
        });
        var table = this.getElement('messages');
        table.setItems(this.messages);
        return this;
    }

    typingLastMessage() {
        var table = this.getElement('messages');
        var textObject = table.getCell(table.items.length - 1).getContainer().getElement('text');
        textObject.typing.start(textObject.src);
        return this;
    }

    typingLastMessagePromise() {
        var self = this;
        return new Promise(function (resolve, reject) {
            self
                .once('type.complete', resolve)
                .typingLastMessage()
        });
    }

    scrollUp(duration) {
        if (duration === undefined) {
            duration = 333;
        }

        if (this.messages.length === 0) {
            this.emit('scrollup.complete');
            return this;
        }

        var table = this.getElement('messages');
        var y0 = table.childOY;
        table.scrollToNextRow();
        var y1 = table.childOY;

        table.childOY = y0;
        this.scene.tweens.add({
            targets: table,
            childOY: y1,
            duration: duration
        })
            .once('complete', function () {
                this.emit('scrollup.complete');
            }, this)

        return this;
    }

    scrollUpPromise(duration) {
        var self = this;
        return new Promise(function (resolve, reject) {
            self
                .once('scrollup.complete', resolve)
                .scrollUp(duration)
        });
    }
}

var CreateBackground = function (scene, config) {
    return scene.rexUI.add.roundRectangle(config);
}

var CreateLabel = function (scene, config) {
    return scene.rexUI.add.simpleLabel(config).resetDisplayContent();
}

var CreateTable = function (scene, config) {
    if (config === undefined) {
        config = {};
    }

    config.background = CreateBackground(scene, config.background);
    config.slider = false;   // No slider
    config.scroller = false; // No scroller

    config.table = {
        mask: { padding: 2 },
        interactive: false,
        reuseCellContainer: true,
        clampChildOY: false,
    }

    config.createCellContainerCallback = function (cell, cellContainer) {
        var scene = cell.scene,
            item = cell.item;
        if (cellContainer === null) { // No reusable cell container, create a new one
            cellContainer = CreateMessageBox(scene, config);
        }

        var wrapWidth = (cell.width < 150) ? cell.width : (cell.width - 50);
        var textObject = cellContainer.getElement('text');
        textObject.src = item.text;
        textObject
            .setFixedSize(wrapWidth, 0)
            .setWordWrapWidth(wrapWidth)
            .setText(item.text)
            .updateText(true)

        cellContainer.setDirty(true).layout().setDirty(false);

        cell.height = cellContainer.height;
        cell.setCellContainerAlign(item.align);

        return cellContainer; // or null
    }

    return scene.rexUI.add.gridTable(config);
}

var CreateMessageBox = function (scene, config) {
    var label = CreateLabel(scene, {
        text: config.text
    })

    var textObject = label.getElement('text');
    textObject.setWrapMode('word');

    textObject.typing = scene.rexUI.add.textTyping(textObject, config.typing)
        .on('type', function () {
            label.getTopmostSizer().emit('type');
        })
        .on('complete', function () {
            label.getTopmostSizer().emit('type.complete');
        })

    return label;
}

var CreateDummyTexture = function (scene, key, width, height) {
    scene.add.graphics()
        .fillStyle(0x333333)
        .lineStyle(2, 0xffffff)
        .fillRect(0, 0, width, height)
        .strokeRect(0, 0, width, height)
        .generateTexture(key, width, height)
        .destroy()
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        CreateDummyTexture(this, 'char', 160, 200);
    }

    async create() {
        var conversationBox = new ConversationBox(this, {
            x: 400, y: 400,
            width: 700, height: 300,

            space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 },

            background: {
                color: COLOR_MAIN,
                radius: 20,
            },

            label: {
                space: { left: 10, right: 10, top: 10, bottom: 10, icon: 10 },
                background: {
                    color: COLOR_DARK
                },
                text: {
                    fontSize: 24
                }
            },

            messages: {
                space: { left: 10, right: 10, top: 10, bottom: 10, },
                background: {
                    color: COLOR_DARK
                },
                text: {
                    $type: 'bbcodetext',
                    fontSize: 20
                },
                typing: {
                    speed: 100,
                    wrap: true
                }
            }
        })
        this.add.existing(conversationBox);

        conversationBox
            .setLabelA({
                icon: 'char', text: 'NameA'
            })
            .setLabelB({
                icon: 'char', text: 'NameB'
            })
            .layout()

        await conversationBox.scrollUpPromise();
        await conversationBox
            .appendMessage({
                text: 'AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA',
                align: 'left'
            })
            .typingLastMessagePromise()

        await conversationBox.scrollUpPromise();
        await conversationBox
            .appendMessage({
                text: 'BBBB BBBB BBBB BBBB BBBB BBBB BBBB BBBB',
                align: 'right'
            })
            .typingLastMessagePromise()
    }

    update() { }
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
        scene: [
            {
                key: 'rexUI',
                plugin: UIPlugin,
                mapping: 'rexUI'
            }
        ]
    }
};

var game = new Phaser.Game(config);