import BoardPlugin from '../../plugins/board-plugin.js';
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

        this.boot();
    }

    boot() {
        // touch control
        this.scene.input
            .on('pointerdown', this.selectChess, this)
            .on('pointerup', this.selectChess, this);

        this.scene.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        this.scene.input
            .off('pointerdown', this.selectChess, this)
            .off('pointerup', this.selectChess, this);

        super.shutdown();
        this.board.shutdown();
        this.mainState.shutdown();

        this.scene = undefined;
        this.board = undefined;
        this.mainState = undefined;
        return this;
    }

    destroy() {
        this.emit('destroy');
        this.shutdown();
        return this;
    }

    setBoardSize(width, height) {
        this.board.setBoardWidth(width).setBoardHeight(height);
        return this;
    }

    start() {
        this.mainState.goto('START');
        return this;
    }

    selectChess(pointer) {
        if (pointer.isDown) {
            var chess = this.board.worldXYToChess(pointer.worldX, pointer.worldY);
            if (chess) {
                this.mainState.selectChess(chess);
            }
        } else { // pointer-up
            var chess1 = this.mainState.selectedChess1;
            if (chess1) {
                var chess2 = this.board.getNeighborChessAtAngle(chess1, pointer.getAngle());
                this.mainState.selectChess(chess2);
            }
        }
    }
}

var loadRexBoardPlugin = function (scene) {
    if (Phaser.Plugins.PluginCache.hasCustom('RexBoardPlugin')) {
        return;
    }
    scene.load.scenePlugin('RexBoardPlugin', BoardPlugin, 'rexBoard', 'rexBoard').start();
}
export default Bejeweled;