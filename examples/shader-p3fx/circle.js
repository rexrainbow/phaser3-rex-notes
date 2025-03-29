import phaser from '../../../phaser/src/phaser.js';
import P3FXPlugin from '../../plugins/p3fx-plugin.js';

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
        var gameObject = this.add.rectangle(400, 300, 200, 200, 0xff0000)
        gameObject.enableFilters()
            .filters.internal.addP3Circle(0);

        this.add.graphics()
            .lineStyle(2, 0xffffff)
            .strokeRectShape(gameObject.getBounds());
    }

    update() {
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
            key: 'rexP3FX',
            plugin: P3FXPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);