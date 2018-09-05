'use strict'

import GeomHexagonPlugin from 'rexPlugins/geomhexagon-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var hexagon0 = this.plugins.get('rexGeomHexagon').add(300, 300, 60, 0);
        var hexagon1 = this.plugins.get('rexGeomHexagon').add(500, 300, 60, 1);
        this.add.graphics()
            // draw hexagon0
            .fillStyle(0x0000ff)
            .lineStyle(2, 0xffffff)
            .fillPoints(hexagon0.points, true)
            .strokePoints(hexagon0.points, true)

            // draw hexagon1
            .fillStyle(0x00ff00)
            .lineStyle(2, 0xffffff)
            .fillPoints(hexagon1.points, true)
            .strokePoints(hexagon1.points, true);

        console.log(hexagon0.width + ',' + hexagon0.height);
    }

    update() {}
}

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Demo,
    plugins: {
        global: [{
            key: 'rexGeomHexagon',
            plugin: GeomHexagonPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);