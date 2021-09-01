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
        var topWin = CreateDialog(this, 'Title', 'Content', 'Description')
            .setMinWidth(300)
            .layout()
            .setPosition(400, 300)
            .setData('value', 100)
    }

    update() { }
}

var CreateDialog = function (scene, title, content, description) {
    // Number input value is stored in topWin's data manager
    var topWin = scene.rexUI.add.sizer({
        orientation: 'y',
        space: { left: 20, right: 20, top: 20, bottom: 20, item: 25 }
    })

    topWin
        .addBackground(
            scene.rexUI.add.roundRectangle(0, 0, 1, 1, 20, COLOR_PRIMARY)
        )
        .add(
            CreateLabel(topWin, title),
            { expand: false, align: 'center' }
        )
        .add(
            CreateNumberInputSizer(topWin, 'value'),
            { expand: true }
        )
        .add(
            CreateLabel(topWin, content),
            { expand: true }
        )
        .add(
            CreateLabel(topWin, description),
            { expand: true }
        )

    return topWin;
}

var CreateLabel = function (topWin, text) {
    var scene = topWin.scene;
    return scene.rexUI.add.label({
        text: scene.rexUI.add.BBCodeText(0, 0, text, { fontSize: '20px' })
    })
}

var CreateNumberInputSizer = function (parent, dataKey) {
    var scene = parent.scene;

    parent.setData(dataKey, undefined);

    var numberInputSizer = scene.rexUI.add.sizer({
        height: 30,
        orientation: 'x',
        space: { item: 5 }
    })
        .add(
            scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10, COLOR_DARK),
                text: scene.rexUI.add.BBCodeText(0, 0, '', { fontSize: '20px', fixedWidth: 120, fixedHeight: 20, valign: 'center' }),
                space: { left: 10, right: 10 }
            }),
            { proportion: 1, expand: true, key: 'numberInput' }
        )
        .add(
            scene.rexUI.add.label({
                width: 30,
                background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10, COLOR_DARK),
                text: scene.rexUI.add.BBCodeText(0, 0, '+', { fontSize: '20px' }),
                align: 'center'
            }),
            { expand: true, key: 'inc' }
        )
        .add(
            scene.rexUI.add.label({
                width: 30,
                background: scene.rexUI.add.roundRectangle(0, 0, 1, 1, 10, COLOR_DARK),
                text: scene.rexUI.add.BBCodeText(0, 0, '-', { fontSize: '20px' }),
                align: 'center'
            }),
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
                    // textObject.text = text;
                    parent.setData(dataKey, Number(text))
                }
            }
            scene.rexUI.edit(numberInput.getElement('text'), config);
        })

    scene.rexUI.add.click(incBtn)
        .on('click', function () {
            parent.incData(dataKey, 1);
        })

    scene.rexUI.add.click(decBtn)
        .on('click', function () {
            parent.incData(dataKey, -1);
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