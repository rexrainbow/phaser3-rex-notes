import 'phaser';
import {
    Board, QuadGrid, HexagonGrid, ChessData,
    CreateTileTexture
} from '../../plugins/board-components';

class MyChess extends Phaser.GameObjects.Image {
    readonly rexChess: ChessData;
    constructor(
        board: Board, tileX: number, tileY: number, tileZ: number,
        key?: string | Phaser.Textures.Texture, frame?: string | number
    ) {

        let scene = board.scene;
        super(scene, 0, 0, key, frame);

        scene.add.existing(this);
        board.addChess(this, tileX, tileY, tileZ, true);
    }
}

class Demo extends Phaser.Scene {
    constructor() {
        super({
            key: 'examples'
        })
    }

    preload() { }

    create() {
        let board = new Board(this, {
            grid: getHexagonGrid(this),
            // grid: getQuadGrid(this),
            width: 5,
            height: 5
        })

        CreateTileTexture(board, 'chess', 'white');

        board
            .forEachTileXY(function (tileXY, board: Board) {
                let chess = new MyChess(board, tileXY.x, tileXY.y, 0, 'chess')
                    .setTint(Phaser.Math.Between(0, 0xffffff));
                console.log(chess.rexChess.tileXYZ);
            }, this);
    }

    update(time, delta) {

    }
}

var getQuadGrid = function (scene: Phaser.Scene) {
    let grid = new QuadGrid({
        x: 400,
        y: 100,
        cellWidth: 100,
        cellHeight: 50,
        type: 1
    });
    return grid;
}

var getHexagonGrid = function (scene: Phaser.Scene) {
    let grid = new HexagonGrid({
        x: 50,
        y: 50,
        size: 50,
        staggeraxis: 'x',
        staggerindex: 'odd'
    })
    return grid;
};

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
};

var game = new Phaser.Game(config);