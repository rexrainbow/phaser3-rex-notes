import DragScalePlugin from '../../plugins/dragscale-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var rectangle = this.add.rectangle(0, 0, 800, 600, 0x333333).setOrigin(0);
        this.plugins.get('rexDragScale').add(rectangle, {
                // autoScale: true
            })
            .on('dragstart', function (dragScale) {
                this.print.text = 'dragstart';
            }, this)
            .on('dragend', function (dragScale) {
                this.print.text = 'dragend';
            }, this)
            .on('drag', function (dragScale) {
                this.print.text = 'drag:' + dragScale.scaleFactor;
            }, this)

        this.print = this.add.text(0, 0, '')
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