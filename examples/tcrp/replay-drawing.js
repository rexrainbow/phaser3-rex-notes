import 'phaser';
import UIPlugin from '../../templates/ui/ui-plugin.js';
import TCRPPlugin from '../../plugins/tcrp-plugin.js';

class Drawer {
    constructor(canvas) {
        this.setCanvas(canvas).clear();
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        return this;
    }

    clear() {
        this.canvas.fill('black');
        return this;
    }

    circle(x, y, r, color, fill) {
        if (fill === undefined) {
            fill = true;
        }
        var ctx = this.canvas.context;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI, false);
        if (fill) {
            ctx.fillStyle = color;
            ctx.fill();
        } else {
            ctx.lineWidth = 2;
            ctx.strokeStyle = color;
            ctx.stroke();
        }
        this.canvas.needRedraw();
        return this;
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var TCRPplugin = this.plugins.get('rexTCRP');
        var recorder = TCRPplugin.addRecorder(this);
        var player = TCRPplugin.addPlayer(this);
        var RunCommands = TCRPplugin.runCommands;

        var panel = CreatePanel(this)
            .setPosition(400, 300)
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000)

        var drawer = new Drawer(panel.getElement('canvas'));
        var hue = 0;

        panel
            .on('canvas.pan', function (pan, canvas, lastPointer) {
                if (player.isPlaying) {
                    player.stop();
                }

                if (!recorder.isRecording) {
                    drawer.clear();
                    recorder.start();
                }

                var command = [
                    'circle', // function name
                    Math.floor(canvas.input.localX), // x
                    Math.floor(canvas.input.localY), // y
                    5, // r
                    `hsl(${hue},50%,50%)` // color
                ]
                recorder.addCommand(command);
                RunCommands(command, drawer);

                hue = (hue + 3) % 360;
            })
            .on('button.click', function (button, index, pointer, event) {
                switch (button.name) {
                    case 'replay':
                        recorder.stop();
                        drawer.clear();
                        player
                            .load(recorder.getCommands(), drawer)
                            .start();
                        break;
                }
            })
    }

    update() { }
}

const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;

var CreatePanel = function (scene) {
    // Top ui
    var panel = scene.rexUI.add.sizer({ orientation: 'x' });

    // Background of panel
    var background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_PRIMARY);
    // Drawing canvas
    var canvas = scene.rexUI.add.canvas(0, 0, 500, 500).setOrigin(0)
    // Buttons
    var buttons = scene.rexUI.add.buttons({
        width: 120,
        orientation: 'y',

        buttons: [
            CreateButton(scene, 'Replay', 'replay')
        ],
        eventEmitter: panel
    })

    // Assemble game objects
    panel
        .addBackground(background)
        .add(
            canvas, // child
            0, // proportion
            'center', // align
            { left: 20, top: 20, bottom: 20, right: 10 }, // padding
            false // expand
        )
        .add(
            buttons, // child
            0, // proportion
            'top', // align
            { top: 20, bottom: 20, right: 20 }, // padding
            true // expand
        )

    panel.addChildrenMap('canvas', canvas);

    // Button display when pointer-over/pointer-out
    panel
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(2, COLOR_LIGHT);
        })
        .on('button.out', function (button) {
            button.getElement('background').setStrokeStyle(2, COLOR_DARK);
        })

    // Catch pan events
    scene.rexUI.add.pan(canvas)
        .on('pan', function (pan, gameObject, lastPointer) {
            panel.emit('canvas.pan', pan, gameObject, lastPointer);
        })

    return panel;
}

var CreateButton = function (scene, text, name) {
    if (name === undefined) {
        name = text;
    }
    return scene.rexUI.add.label({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10).setStrokeStyle(2, COLOR_DARK),
        text: scene.add.text(0, 0, text),
        align: 'center',
        space: {
            left: 10, right: 10, top: 10, bottom: 10
        },
        name: name
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
        global: [
            {
                key: 'rexTCRP',
                plugin: TCRPPlugin,
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