import DragScalePlugin from '../../plugins/dragscale-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var rectangle = this.add.rectangle(400, 300, 100, 50, 0xffffff);
        this.plugins.get('rexDragScale').add(rectangle, {
            // autoScale: true
        })
    }
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexDragScale',
            plugin: DragScalePlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);