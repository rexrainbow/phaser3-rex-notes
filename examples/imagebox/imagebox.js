import phaser from 'phaser/src/phaser.js';
import ImageBoxPlugin from '../../plugins/imagebox-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {
        this.load.image('classroom', 'assets/images/backgrounds/classroom.png');
        this.load.image('card', 'assets/images/card2.png');
    }

    create() {
        var graphics = this.add.graphics();

        this.add.rexImageBox(200, 300, 'classroom', undefined, {
            background: this.add.rectangle(0, 0, 10, 10, 0x888888)
        })
            .resize(200, 200)
            .drawBounds(graphics, 0xff0000)

        this.add.rexImageBox(600, 300, 'card', undefined, {
            background: this.add.rectangle(0, 0, 10, 10, 0x888888)
        })
            .resize(200, 200)
            .drawBounds(graphics, 0xff0000)



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
            key: 'rexImageBox',
            plugin: ImageBoxPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);