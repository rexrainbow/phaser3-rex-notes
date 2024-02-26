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

    preload() {
        this.load.image('play', './assets/images/play.png');
        this.load.image('pause', './assets/images/pause.png');
        this.load.video('test', './assets/video/test.mp4', 'canplaythrough', false, true);
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
        x: x, y: y,

        space: { left: 20, right: 20, top: 20, bottom: 20, item: 10 }
    })
        .addBackground(background)
        .add(
            videoPanel,
            { proportion: 0, expand: false }
        )
        .add(
            controllerPanel,
            { proportion: 0, expand: true }
        )

    return mainPanel;
}

var CreateControllerPanel = function (scene) {
    return scene.rexUI.add.numberBar({
        icon: scene.add.image(0, 0, 'play'),
        slider: {
            track: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_MAIN),
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
    return scene.add.video(0, 0, 'test')
        .setSize(640, 360)  // Equal to video size
        .setDisplaySize(600, 337.5)
}

var ControlVideo = function (controller, video) {
    // Play button
    var played = false;
    var playButton = controller.getElement('icon');
    playButton
        .setInteractive()
        .on('pointerdown', function () {
            var textureKey = playButton.texture.key;
            if (textureKey === 'play') {
                if (!played) {
                    played = true;
                    video.play();
                } else {
                    video.setPaused(false);
                }
            } else {
                video.setPaused();
            }

            if (video.isPlaying()) {
                playButton.setTexture('pause');
            } else {
                playButton.setTexture('play');
            }
        });

    // Playback time
    var lastVideoProgress = undefined;
    video.scene.events.on('update', function () {
        var currentVideoProgress = video.getProgress();
        if (lastVideoProgress !== currentVideoProgress) {
            lastVideoProgress = currentVideoProgress;
            controller.value = currentVideoProgress;
            controller.text = Math.floor(video.getCurrentTime() * 10) / 10;
        }
    })
    controller.on('valuechange', function (newValue) {
        if (video.getProgress() !== newValue) {
            video.seekTo(newValue);
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