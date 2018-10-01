import BoardPlugin from 'rexPlugins/board-plugin.js'
import MainState from './states/MainState.js';
import MatchState from './states/MatchState.js';
import Board from './board/Board.js';

const EE = Phaser.Events.EventEmitter;

class Bejeweled extends EE {
    constructor(scene, config) {
        loadRexBoardPlugin(scene);
        super();

        this.scene = scene;
        this.board = new Board(scene, config);
        this.mainState = new MainState(this, config);
        this.matchState = new MatchState(this, config);

        // touch control
        this.board
            .onPointerDown(this.selectChess, this)
            .onPointerMove(this.selectChess, this);
    }

    setBoardSize(width, height) {
        this.board.setBoardWidth(width).setBoardHeight(height);
        return this;
    }

    start() {
        this.mainState.goto('START');
        return this;
    }

    selectChess(chess) {
        this.mainState.selectChess(chess);
    }
}

var loadRexBoardPlugin = function (scene) {
    if (Phaser.Plugins.PluginCache.hasCustom('RexBoardPlugin')) {
        return;
    }
    scene.load.scenePlugin('RexBoardPlugin', BoardPlugin, 'rexBoard', 'rexBoard').start();
}
export default Bejeweled;