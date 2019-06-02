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

    preload() {
        this.load.image('play', './assets/images/play.png');
        this.load.image('pause', './assets/images/pause.png');
    }

    create() {
        var mainPanel = CreateMainPanel(this, 400, 300)
            .layout()
            .drawBounds(this.add.graphics(), 0xff0000);
    }

    update() { }
}

var CreateMainPanel = function (scene, x, y) {
    var background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK);
    var videoPanel = CreateVideoPanel(scene);
    var controllerPanel = CreateControllerPanel(scene, videoPanel);
    // Sizer
    var mainPanel = scene.rexUI.add.sizer({
        orientation: 'y',
        x: x,
        y: y,
    })
        .addBackground(background)
        .add(videoPanel, 0, 'center', { left: 20, right: 20, top: 20, bottom: 10 }, true)
        .add(controllerPanel, 0, 'center', { left: 20, right: 20, bottom: 20 }, true)

    return mainPanel;
}

var CreateControllerPanel = function (scene, videoPanel) {
    var numberBar = scene.rexUI.add.numberBar({
        icon: scene.add.image(0, 0, 'play'),
        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            input: 'click',
        },

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            icon: 10,
            //slider: 10,
        },

    });
    ControlVideo(numberBar, videoPanel);
    return numberBar;
}

var ControlVideo = function(controller, video) {
    var playButton = numberBar.getElement('icon');
}

var CreateVideoPanel = function (scene) {
    return scene.rexUI.add.videoCanvas({
        width: 400,
        height: 225,
        src: './assets/video/test.mp4',
        autopPlay: false
    });
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