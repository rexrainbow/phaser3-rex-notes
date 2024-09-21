import phaser from 'phaser/src/phaser.js';
import UIPlugin from '../../templates/ui/ui-plugin.js';

const COLOR_MAIN = 0x4e342e;
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
        var panel = CreatePanel(this)
            .setMinSize(500, 500)
            .setPosition(400, 300)
            .layout()

        TracePointOver(panel)

        var print = this.add.text(0, 0, '')
        panel
            .on('tracestart', function () {
                print.text = 'Start'
            })
            .on('traceend', function (result) {
                print.text = result.join(',')
            })

        // panel.destroy()
    }

    update() { }
}

var CreatePanel = function (scene) {
    var background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_MAIN);
    return scene.rexUI.add.gridSizer({
        column: 10, columnProportions: 1,
        row: 10, rowProportions: 1,

        createCellContainerCallback(scene, x, y, config) {
            config.expand = true;
            var text = x * 10 + y;
            return scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10).setStrokeStyle(2, COLOR_LIGHT),
                text: scene.add.text(0, 0, text, {
                    fontSize: 18
                }),
                align: 'center'
            })
        },

        space: {
            left: 5, right: 5, top: 5, bottom: 5,
            row: 12, column: 12
        }
    })
        .addBackground(background, 0, 'background')
}

var TracePointOver = function (panel) {
    var tracing = false;
    var result = [];

    var onTraceStart = function () {
        tracing = true;
        result.length = 0;
        panel.getElement('items').forEach(function (button) {
            button.getElement('background').setFillStyle()
        });
        panel.emit('tracestart');
    }

    var onTraceNewButton = function (button) {
        var index = button.text;
        if (!result.includes(index)) {
            result.push(index);
            button.getElement('background').setFillStyle(COLOR_DARK);
        }
    }

    var onTraceEnd = function () {
        if (!tracing) {
            return;
        }
        tracing = false;
        panel.emit('traceend', result);
    }

    panel.getElement('items').forEach(function (button) {
        button
            .setInteractive()
            .on('pointerdown', function () {
                onTraceStart();

                onTraceNewButton(button);
            })
            .on('pointerover', function () {
                if (!tracing) {
                    return;
                }
                onTraceNewButton(button);
            })
            .on('pointerup', function () {
                onTraceEnd();
            })
    })

    panel
        .bindEvent(
            panel.scene.input, // eventEmitter
            'pointerdown',     // eventName
            function () {      // callback
                if (tracing) {
                    return;
                }
                onTraceStart();
            }
        )
        .bindEvent(
            panel.scene.input, // eventEmitter
            'pointerup',     // eventName
            function () {      // callback
                onTraceEnd();
            }
        )
        .bindEvent(
            panel.scene.input, // eventEmitter
            'pointermove',     // eventName
            function () {      // callback
                if (panel.isPointerInBounds()) {
                    return;
                }
                onTraceEnd();
            }
        )

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