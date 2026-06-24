import Phaser from 'phaser';
import RectangleMaskFilterPlugin from '../../plugins/rectanglemaskfilter-plugin.js';

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
        var layer = this.add.layer().add(this.add.image(400, 300, 'classroom'));

        layer
            .enableFilters()
            .filters.external
            .addRexRectangleMask({
                x: 400 - 150,
                y: 300 - 150,
                width: 300,
                height: 300,
            })
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
            key: 'rexRectangleMaskFilter',
            plugin: RectangleMaskFilterPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);