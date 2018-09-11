'use strict'

import HexagonPlugin from 'rexPlugins/hexagon-plugin.js';

import HexahonGrid from 'rexPlugins/board/grid/Hexagon.js';
import Board from 'rexPlugins/board/board/Board.js';

const Random = Phaser.Math.Between;

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() {}

    create() {
        var staggeraxis = 'x';
        var staggerindex = 'odd';
        var key = 'shape';
        var texture = createHexagonTexture(this, key, staggeraxis, staggerindex);
        var image = texture.getSourceImage();

        var grid = new HexahonGrid({
            x: 200,
            y: 200,
            cellWidth: image.width,
            cellHeight: image.height,
            staggeraxis: staggeraxis,
            staggerindex: staggerindex
        });
        var board = new Board(this, {
            grid: grid,
            width: 8,
            height: 8
        })
        board.forEachTileXY(function (board, tileX, tileY) {
            var chess = this.add.image(0, 0, key)
                .setTint(Random(0, 0xffffff));
            board.addChess(chess, tileX, tileY);
        }, this);

        this.board = board;
        this.print = this.add.text(0, 0, '');
    }

    update() {
        var pointer = this.input.activePointer;
        var tileXY = this.board.worldXYToTileXY(pointer)
        this.print.setText(tileXY.x + ',' + tileXY.y);
    }
}

var createHexagonTexture = function (scene, key, staggeraxis) {
    var hexagon = new Phaser.Geom.rexHexagon(0, 0, 30, staggeraxis);
    hexagon.left = 0;
    hexagon.top = 0;

    var points = hexagon.points;
    scene.add.graphics()
        .fillStyle(0xffffff)
        .fillPoints(points, true)
        .generateTexture(key, Math.floor(hexagon.width), Math.floor(hexagon.height))
        .destroy();
    return scene.textures.get(key);
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