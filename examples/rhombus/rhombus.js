import RhombusPlugin from '../../plugins/rhombus-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var printTxt = this.add.text(0, 0, '');

        var rhombus = this.plugins.get('rexRhombus').add(0, 0, 120, 60);
        RhombusShape(this, rhombus, 0x0000ff, 0xffffff, 2)
            .setPosition(300, 300)
            .on('pointerdown', function () {
                printTxt.text += 'click rhombus0\n';
            });

        RhombusShape(this, rhombus, 0x00ff00, 0xffffff, 2)
            .setPosition(500, 300)
            .on('pointerdown', function () {
                printTxt.text += 'click rhombus1\n';
            });
    }

    update() {}
}

var RhombusShape = function (scene, rhombus, fillColor, lineColor, lineWidth) {
    var points = rhombus.points;
    // draw shape on a Graphics object
    var graphics = scene.add.graphics()
        .fillStyle(fillColor)
        .fillPoints(points, true)
        .lineStyle(lineWidth, lineColor)
        .strokePoints(points, true)
        // set hit area
        .setInteractive(rhombus, Phaser.Geom.Polygon.Contains);

    return graphics;
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
            key: 'rexRhombus',
            plugin: RhombusPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);