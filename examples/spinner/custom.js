import SpinnerPlugin from '../../templates/spinner/spinner-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        var spinner = this.rexSpinner.add.custom({
            x: 400, y: 300,
            width: 80, height: 80,

            create: {
                line: 4
            },

            update: function () {
                var centerX = this.centerX;
                var centerY = this.centerY;
                var radius = this.radius;
                var leftBound = centerX - radius;
                var bottomBound = centerY + radius;
                var maxLineHeight = radius * 2;

                var shapes = this.getShapes(),
                    cnt = shapes.length;
                var cellWidth = (radius * 2) / cnt;
                var lineWidth = cellWidth * 0.7;

                // Reset range of value
                if ((this.prevValue === undefined) || (this.prevValue > this.value)) {
                    for (var i = 0; i < cnt; i++) {
                        var line = shapes[i];
                        var from = (this.prevValue === undefined) ? Math.random() : line.getData('to');
                        line
                            .setData('from', from)
                            .setData('to', Math.random())
                    }
                }
                this.prevValue = this.value;

                for (var i = 0; i < cnt; i++) {
                    var line = shapes[i];
                    var from = line.getData('from'),
                        to = line.getData('to'),
                        current = Phaser.Math.Linear(from, to, this.value);
                    var lineHeight = current * maxLineHeight;
                    var x = leftBound + (cellWidth * (i + 0.5));

                    line
                        .lineStyle(lineWidth, this.color, 1)
                        .setP0(x, bottomBound)
                        .setP1(x, (bottomBound - lineHeight));

                }
            }
        });
        this.add.rectangle(400, 300, 80, 80).setStrokeStyle(2, 0xff0000)
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
        scene: [{
            key: 'rexSpinner',
            plugin: SpinnerPlugin,
            mapping: 'rexSpinner'
        }]
    }
};

var game = new Phaser.Game(config);