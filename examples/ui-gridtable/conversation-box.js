import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import TextTypingPlugin from '../../plugins/texttyping-plugin.js';

const COLOR_PRIMARY = 0x4e342e;
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

        var background = new RexPlugins.UI.RoundRectangle(scene, config.background);
        scene.add.existing(background);
        this.addBackground(background);

        var labelConfig = (config.label) ? Clone(config.label) : {};
        labelConfig.orientation = 'y';
        var labelA = new RexPlugins.UI.SimpleLabel(scene, labelConfig);
        labelA.resetDisplayContent();
        scene.add.existing(labelA);
        this.add(labelA, { key: 'labelA' });

        var messagesConfig = (config.messages) ? Clone(config.messages) : {};
        var messageBackground = new RexPlugins.UI.RoundRectangle(scene, messagesConfig.background);
        scene.add.existing(messageBackground);
        messagesConfig.background = messageBackground;

        messagesConfig.table = {
            mask: { padding: 2 },
            interactive: false,
            reuseCellContainer: true,
            slider: false,
            scroller: false,
            clamplChildOY: false,
        }

        var messageTextStyle = messagesConfig.text;
        var TextTypingFactory = scene.plugins.get('rexTextTyping');
        var messageTypingConfig = messagesConfig.typing || {};
        messagesConfig.createCellContainerCallback = function (cell, cellContainer) {
            var scene = cell.scene,
                item = cell.item;
            if (cellContainer === null) { // No reusable cell container, create a new one
                cellContainer = new RexPlugins.UI.BBCodeText(scene, 0, 0, '', messageTextStyle);
                cellContainer.setOrigin(0);
                scene.add.existing(cellContainer);

                cellContainer.setWrapMode('word');

                cellContainer.typing = TextTypingFactory.add(cellContainer, messageTypingConfig);
            }

            var wrapWidth = (cell.width < 100) ? cell.width : (cell.width - 30);
            cellContainer
                .setWordWrapWidth(wrapWidth)
                .setText(item.text)
                .updateText(true)

            cell.setCellContainerAlign(item.align);

            cell.height = cellContainer.height;

            return cellContainer; // or null
        }
        messagesConfig.items = this.messages;
        var messages = new RexPlugins.UI.GridTable(scene, messagesConfig);
        scene.add.existing(messages);
        this.add(
            messages,
            { proportion: 1, expand: true, key: 'messages' }
        );

        var labelB = new RexPlugins.UI.SimpleLabel(scene, labelConfig);
        labelB.resetDisplayContent();
        scene.add.existing(labelB);
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
        var textObject = table.getCell(table.items.length - 1).getContainer();
        textObject.typing.start(textObject.text);
        return this;
    }

    scrollUp() {
        if (this.messages.length === 0) {
            return this;
        }

        var table = this.getElement('messages');
        table.scrollToNextRow();
        return this;
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        var imageWidth = 160, imageHeight = 200;
        this.add.graphics()
            .fillStyle(0x333333)
            .lineStyle(2, 0xffffff)
            .fillRect(0, 0, imageWidth, imageHeight)
            .strokeRect(0, 0, imageWidth, imageHeight)
            .generateTexture('char', imageWidth, imageHeight)
            .destroy()
    }

    create() {
        var conversationBox = new ConversationBox(this, {
            x: 400, y: 400,
            width: 700, height: 300,

            space: { left: 10, right: 10, top: 10, bottom: 10, item: 10 },

            background: {
                color: COLOR_PRIMARY,
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
                space: { top: 10, bottom: 10 },
                background: {
                    color: COLOR_DARK
                },
                text: {
                    fontSize: 20
                },
                typing: {
                    speed: 100,
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

            .appendMessage({
                text: 'AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA \
AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA \
AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA AAAA',
                align: 'left'
            })
            .typingLastMessage()

            .drawBounds(
                this.add.graphics(),
                0xff0000
            )
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
        global: [
            {
                key: 'rexTextTyping',
                plugin: TextTypingPlugin,
                start: true
            }

        ],
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