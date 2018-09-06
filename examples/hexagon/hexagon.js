'use strict'

import HexagonPlugin from 'rexPlugins/hexagon-plugin.js';

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var hexagon0 = this.plugins.get('rexHexagon').add(300, 300, 60, 0);
        var hexagon1 = this.plugins.get('rexHexagon').add(500, 300, 60, 1);        
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

        this.hexagon0 = hexagon0;
        this.hexagon1 = hexagon1;
        this.print = this.add.text(0, 0, '');
    }

    update() {
        var pointer = this.input.activePointer;
        var px = pointer.x,
            py = pointer.y;
        if (this.hexagon0.contains(px, py)) {
            this.print.setText('Inside hexagon0');
        } else if (this.hexagon1.contains(px, py)) {
            this.print.setText('Inside hexagon1');
        } else {
            this.print.setText('--')
        }
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
            key: 'rexHexagon',
            plugin: HexagonPlugin,
            start: true
        }]
    }
};

var game = new Phaser.Game(config);