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
            //.drawBounds(this.add.graphics(), 0xff0000)
            .popUp(1000)
    }

    update() { }
}

var CreateMainPanel = function (scene, x, y) {
    // Create elements
    var background = scene.rexUI.add.roundRectangle(0, 0, 0, 0, 20, COLOR_DARK);
    var videoPanel = CreateVideoPanel(scene);
    var controllerPanel = CreateControllerPanel(scene);
    ControlVideo(controllerPanel, videoPanel);
    // Compose elemets
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

var CreateControllerPanel = function (scene) {
    return scene.rexUI.add.numberBar({
        icon: scene.add.image(0, 0, 'play'),
        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_PRIMARY),
            indicator: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_LIGHT),
            input: 'click',
        },

        text: scene.rexUI.add.BBCodeText(0, 0, '', {
            fixedWidth: 50, fixedHeight: 36,
            valign: 'center', halign: 'right'
        }),

        space: {
            left: 10,
            right: 10,
            top: 10,
            bottom: 10,

            icon: 10,
            slider: 10,
        },

    });
}

var CreateVideoPanel = function (scene) {
    return scene.rexUI.add.videoCanvas({
        width: 600,
        height: 337.5,
        src: './assets/video/test.mp4',
        autoPlay: false
    });
}

var ControlVideo = function (controller, video) {
    // Play button
    var playButton = controller.getElement('icon');
    video
        .on('pause', function () {
            playButton.setTexture('play');
        })
        .on('playing', function () {
            playButton.setTexture('pause');
        });

    playButton
        .setInteractive()
        .on('pointerdown', function () {
            var textureKey = playButton.texture.key;
            if (textureKey === 'play') {
                video.play();
            } else {
                video.pause();
            }
        });

    // Playback time
    video.on('playbacktimechange', function (video) {
        if ((video.t === 0) || (controller.value !== video.t)) {
            controller.value = video.t;
            controller.text = Math.floor(video.playbackTime * 10) / 10;
        }
    })
    controller.on('valuechange', function (newValue) {
        if (video.t !== newValue) {
            video.t = newValue;
        }
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