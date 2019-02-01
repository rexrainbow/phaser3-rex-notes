import UIPlugin from '../../templates/ui/ui-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var mainPanel = createMainPanel(this)
            .setPosition(400, 300)
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);
    }

    update() {}
}

var createMainPanel = function (scene) {
    // Create components
    var objectPanel = scene.add.rectangle(0, 0, 200, 200);
    var controller = createController(scene);
    var mainPanel = scene.rexUI.add.sizer({
            orientation: 'x',
        }).add(
            controller, //child
            0, // proportion
            'top', // align
            0, // paddingConfig
            false, // expand
        )
        .add(
            objectPanel, //child
            0, // proportion
            'center', // align
            0, // paddingConfig
            false, // expand
        );

    // Connect events
    var updateFillColor = function () {
        var red = Math.round(controller.getByName('R').getValue(0, 255));
        var green = Math.round(controller.getByName('G').getValue(0, 255));
        var blue = Math.round(controller.getByName('B').getValue(0, 255));
        objectPanel.setFillStyle(Phaser.Display.Color.GetColor(red, green, blue));
    }
    controller.on('valuechange', function () {
        updateFillColor();
    });
    updateFillColor();
    return mainPanel;
};

var createController = function (scene) {
    // Create components
    var redSlider = createSlider(scene, 'R', 0xd50000, 0x9b0000, 0xff5131).setName('R');
    var greenSlider = createSlider(scene, 'G', 0x00c853, 0x009624, 0x5efc82).setName('G');
    var blueSlider = createSlider(scene, 'B', 0x304ffe, 0x0026ca, 0x7a7cff).setName('B');
    var controlPanel = scene.rexUI.add.sizer({
            orientation: 'y',
        })
        .add(
            redSlider, //child
            0, // proportion
            'center', // align
            0, // paddingConfig
            true, // expand
        )
        .add(
            greenSlider, //child
            0, // proportion
            'center', // align
            0, // paddingConfig
            true, // expand
        )
        .add(
            blueSlider, //child
            0, // proportion
            'center', // align
            0, // paddingConfig
            true, // expand
        );

    // Connect events
    redSlider.on('valuechange', function () {
        this.emit('valuechange');
    }, controlPanel);
    greenSlider.on('valuechange', function () {
        this.emit('valuechange');
    }, controlPanel);
    blueSlider.on('valuechange', function () {
        this.emit('valuechange');
    }, controlPanel);
    return controlPanel;
};

var createSlider = function (scene, colorText, colorPrimary, colorDark, colorLight) {
    return scene.rexUI.add.numberBar({
        background: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 0, colorDark),

        icon: scene.add.text(0, 0, colorText, {
            fontSize: 18
        }),

        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, colorPrimary),
            indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, colorLight),
            input: 'click',
            width: 100, // Fixed width
        },

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            icon: 10,
            slider: 10,
        },

        value: Math.random()
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