import BoardPlugin from 'rexPlugins/board-plugin.js'
import MainState from './states/MainState.js';
import Board from './board/Board.js';

const EE = Phaser.Events.EventEmitter;

class Bejeweled extends EE {
    constructor(scene, config) {
        loadRexBoardPlugin(scene);
        super();

        this.scene = scene;
        this.board = new Board(scene, config);
        this.mainState = new MainState(this, config);
        
        // touch control
        this.board
            .onPointerDown(this.selectChess, this)
            .onPointerMove(this.selectChess, this)
            .onPointerUp(this.cancelSelecting, this);
    }

    setBoardSize(width, height) {
        this.board.setBoardWidth(width).setBoardHeight(height);
        return this;
    }

    start() {
        this.mainState.goto('START');
        return this;
    }

    selectChess(pointer, chess) {
        this.mainState.selectChess(chess);
    }

    cancelSelecting() {
        this.mainState.selectChess();
    }
}

var loadRexBoardPlugin = function (scene) {
    if (Phaser.Plugins.PluginCache.hasCustom('RexBoardPlugin')) {
        return;
    }
    scene.load.scenePlugin('RexBoardPlugin', BoardPlugin, 'rexBoard', 'rexBoard').start();
}
export default Bejeweled;