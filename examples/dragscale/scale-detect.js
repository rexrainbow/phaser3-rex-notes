import DragScalePlugin from '../../plugins/dragscale-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var print = this.add.text(0, 0, '')

        var circle = this.add.circle(400,300, 200, 0x888888);
        var dragScale = this.plugins.get('rexDragScale').add(this);
        dragScale
            .on('dragstart', function (dragScale) {
                // print.text = 'dragstart';
            }, this)
            .on('dragend', function (dragScale) {
                // print.text = 'dragend';
            }, this)
            .on('drag', function (dragScale) {
                var scaleFactor = dragScale.scaleFactor;
                circle.scaleX *= scaleFactor;
                circle.scaleY *= scaleFactor;
                print.text = circle.scaleX;
            }, this);
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