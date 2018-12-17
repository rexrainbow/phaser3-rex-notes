import PinchPlugin from '../../plugins/pinch-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var print = this.add.text(0, 0, '')

        var circle = this.add.circle(400, 300, 200, 0x888888);
        var pinch = this.plugins.get('rexPinch').add(this);
        pinch
            .on('drag1', function (pinch) {
                var drag1Vector = pinch.drag1Vector;
                circle.x += drag1Vector.x;
                circle.y += drag1Vector.y;
            })
            .on('pinch', function (pinch) {
                var scaleFactor = pinch.scaleFactor;
                circle.scaleX *= scaleFactor;
                circle.scaleY *= scaleFactor;
                print.text = circle.scaleX;
            }, this)
            .on('drag1start', function (pinch) {
                print.text = 'drag1start';
            }, this)
            .on('drag1end', function (pinch) {
                print.text = 'drag1end';
            }, this)
            .on('pinchstart', function (pinch) {
                print.text = 'pinchstart';
            }, this)
            .on('pinchend', function (pinch) {
                print.text = 'pinchend';
            }, this)


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
            key: 'rexPinch',
            plugin: PinchPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);