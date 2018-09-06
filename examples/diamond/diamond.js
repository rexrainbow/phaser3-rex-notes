'use strict'

import DiamondPlugin from 'rexPlugins/diamond-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var printTxt = this.add.text(0, 0, '');

        var diamond = this.plugins.get('rexDiamond').add(0, 0, 120, 60);
        DiamondShape(this, diamond, 0x0000ff, 0xffffff, 2)
            .setPosition(300, 300)
            .on('pointerdown', function () {
                printTxt.text += 'click diamond0\n';
            });

        var diamond = this.plugins.get('rexDiamond').add(0, 0, 120, 60);
        DiamondShape(this, diamond, 0x00ff00, 0xffffff, 2)
            .setPosition(500, 300)
            .on('pointerdown', function () {
                printTxt.text += 'click diamond1\n';
            });
    }

    update() {}
}

var DiamondShape = function (scene, diamond, fillColor, lineColor, lineWidth) {
    var points = diamond.points;
    // draw shape on a Graphics object
    var graphics = scene.add.graphics()
        .fillStyle(fillColor)
        .fillPoints(points, true)
        .lineStyle(lineWidth, lineColor)
        .strokePoints(points, true)
        // set hit area
        .setInteractive(diamond, Phaser.Geom.Polygon.Contains);

    return graphics;
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexDiamond',
            plugin: DiamondPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);