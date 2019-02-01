import HexagonPlugin from '../../plugins/hexagon-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var printTxt = this.add.text(0, 0, '');

        // add hexagon from plugin
        var hexagon = this.plugins.get('rexHexagon').add(0, 0, 60, 0);
        HexagonShape(this, hexagon, 0x0000ff, 0xffffff, 2)
            .setPosition(300, 300)
            .on('pointerdown', function () {
                printTxt.text += 'click hex0\n';
            });

        // add hexagon from Phaser.Geom.rexHexagon class
        var hexagon = new Phaser.Geom.rexHexagon(0, 0, 60, 1);
        HexagonShape(this, hexagon, 0x00ff00, 0xffffff, 2)
            .setPosition(500, 300)
            .on('pointerdown', function () {
                printTxt.text += 'click hex1\n';
            });

    }

    update() {}
}

var HexagonShape = function (scene, hexagon, fillColor, lineColor, lineWidth) {
    var points = hexagon.points;
    // draw shape on a Graphics object
    var graphics = scene.add.graphics()
        .fillStyle(fillColor)
        .fillPoints(points, true)
        .lineStyle(lineWidth, lineColor)
        .strokePoints(points, true)
        // set hit area
        .setInteractive(hexagon, Phaser.Geom.Polygon.Contains);
        
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
            key: 'rexHexagon',
            plugin: HexagonPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);