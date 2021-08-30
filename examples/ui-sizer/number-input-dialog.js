import 'phaser';
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

    preload() { }

    create() {
        CreateDialog(this, 'Title', 'Content', 'Description')
            .setMinWidth(200)
            .setPosition(400, 300)
            .layout()
            .setData('value', 100)
    }

    update() { }
}

var CreateDialog = function (scene, title, content, description) {
    var ui = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 15, right: 15, top: 15, bottom: 15, item: 10 }
    })
        .setData('value', undefined);

    ui
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 1, 1, 20, COLOR_PRIMARY)
        )
        .add(
            CreateLabel(ui, title),
            { expand: true }
        )
        .add(
            CreateNumberInputSizer(ui),
            { expand: true }
        )
        .add(
            CreateLabel(ui, content),
            { expand: true }
        )
        .add(
            CreateLabel(ui, description),
            { expand: true }
        )

    return ui;
}

var CreateLabel = function (parent, text) {
    var scene = parent.scene;
    return scene.rexUI.add.label({
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontSize: '20px' })
    })
}

var CreateNumberInputSizer = function (parent) {
    var scene = parent.scene;
    var numberInputSizer = scene.rexUI.add.sizer({
        orientation: 'x',
        space: { item: 3 }
    })
        .add(
            scene.rexUI.add.label({
                text: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: '20px', fixedWidth: 120, fixedHeight: 20, valign: 'center' }),
            }),
            { proportion: 1, expand: true, key: 'numberInput' }
        )
        .add(
            CreateLabel(parent, '+'),
            { expand: true, key: 'inc' }
        )
        .add(
            CreateLabel(parent, '-'),
            { expand: true, key: 'dec' }
        )

    var numberInput = numberInputSizer.getElement('numberInput');
    var incBtn = numberInputSizer.getElement('inc');
    var decBtn = numberInputSizer.getElement('dec')

    parent.on('changedata-value', function (top, value) {
        numberInput.setText(value);
    })

    scene.rexUI.add.click(numberInput)
        .on('click', function (button, numberInput) {
            var config = {
                type: 'number',
                onTextChanged: function (textObject, text) {
                    textObject.text = text;

                    parent.setData('value', Number(text))
                }
            }
            scene.rexUI.edit(numberInput.getElement('text'), config);
        })

    scene.rexUI.add.click(incBtn)
        .on('click', function () {
            parent.incData('value', 1);
        })

    scene.rexUI.add.click(decBtn)
        .on('click', function () {
            parent.incData('value', -1);
        })

    return numberInputSizer;
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
    dom: {
        createContainer: true
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