import ShatterImagePlugin from '../../plugins/shatterimage-plugin.js'

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
        var image = this.add.rexShatterImage(400, 300, 'classroom')
            .shatter()

        this.debug = this.add.graphics();
        image.setDebug(this.debug);

        this.input.on('pointerdown', function (pointer) {
            image.shatter(pointer);
        });
    }

    update() {
        this.debug.clear();
        this.debug.lineStyle(1, 0x00ff00);
    }
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
            key: 'rexShatterImage',
            plugin: ShatterImagePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);