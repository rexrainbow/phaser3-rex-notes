import 'phaser';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
    }

    create() {
        var element = this.add.dom(400, 300, 'div',
            'background-color: rgba(255, 255, 0, 0.5); width: 300px; height: 200px; font: 48px Arial; font-weight: bold',
            'Phaser 3');

        this.add.text(0, 0, 'Full screen')
            .setInteractive()
            .on('pointerdown', function () {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                    // On stop fulll screen
                } else {
                    this.scale.startFullscreen();
                    // On start fulll screen
                }
            }, this)
    }

    update() {
    }
}

var config = {
    type: Phaser.AUTO,
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600,
    },
    dom: {
        createContainer: true
    },
    fullscreenTarget: 'phaser-example',
    scene: Demo,
};

var game = new Phaser.Game(config);