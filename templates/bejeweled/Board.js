import RexBoard from 'rexPlugins/board/board/Board.js';
import RexMatch from 'rexPlugins/board/match/Match.js';
import Chess from './Chess.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Baord {
    constructor(scene, config) {
        this.board = new RexBoard(scene, GetValue(config, 'board', undefined));
        this.match = new RexMatch(GetValue(config, 'match', undefined));
        this.match.setBoard(this.board);
        this.chessConfig = GetValue(config, 'chess', undefined);
    }

    init() {
        /* 
        1. Fill background tiles
        */
        return this;
    }

    reset() {
        /* 
        1. Destroy all chess
        2. Fill chess
        3. Break match3
        */

        // Destroy all chess
        this.board.removeAllChess();
        // Fill chess
        this.fill();
        // Break match3
        this.breakMatch3();
    }

    fill() {
        /*
        1. Fill empty grids
        */
       var createGameObjectCallback = GetValue(this.chessConfig, 'create', undefined);
       var createGameObjectScope = GetValue(this.chessConfig, 'scope', undefined);
        var board = this.board;
        for (var tileY = 0, height = this.board.height; tileY < height; tileY++) {
            for (var tileX = 0, width = this.board.width; tileX < width; tileX++) {
                if (board.contains(tileX, tileY, 0)) {
                    continue;
                }
                new Chess(board, tileX, tileY, 0, 0 /*TODO Create symbol*/,
                    createGameObjectCallback, createGameObjectScope);
            }
        }
    }

    breakMatch3() {
        /*
        1. Pick each match3 line
        2. Pick a random chess in this match3 line
        3. Change frame index to a different frame of all neighbors
        */
    }

    fall() {
        /* 
        1. Falling down all chess
        */
    }

    preTest() {
        /*
        1. Test if there has any matched line after chess swapping
        */
    }
}

export default Baord;