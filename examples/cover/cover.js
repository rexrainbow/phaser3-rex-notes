import 'phaser';
import CoverPlugin from '../../plugins/cover-plugin.js'

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
    }

    create() {
        var print = this.add.text(0, 0, '').setDepth(1);

        this.add.image(400, 300, 'classroom')
            .setInteractive()
            .on('pointerdown', function () {
                print.text += 'Img pointer-down\n';
            })

        var cover = this.add.rexCover({ alpha: 0.8 });

        var ui = this.add.rectangle(200, 400, 100, 100, 0x880000)
            .setInteractive()
            .on('pointerdown', function () {
                ui.destroy();
                cover.destroy();
            })
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
        global: [{
            key: 'rexCover',
            plugin: CoverPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);