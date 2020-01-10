import MainState from './states/MainState.js';
import Board from './board/Board.js';
import Input from './input/Input.js';

const EE = Phaser.Events.EventEmitter;
const GetValue = Phaser.Utils.Objects.GetValue;

class Bejeweled extends EE {
    constructor(scene, config) {
        super();

        var rexBoardKey = GetValue(config, 'rexBoard', 'rexBoard');
        this.rexBoard = scene[rexBoardKey];
        this.scene = scene;
        this.board = new Board(this, config);
        this.mainState = new MainState(this, config);
        this.input = new Input(this, config);

        this.boot();
    }

    boot() {
        this.scene.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        super.shutdown();
        this.input.shutdown();
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

    // Input methods
    get selectedChess1() {
        return this.mainState.selectedChess1;
    }

    selectChess1(chess) {
        this.mainState.selectChess1(chess);
        return this;
    }

    selectChess2(chess) {
        this.mainState.selectChess2(chess);
        return this;
    }

    setInputEnable(enable) {
        this.input.setEnable(enable);
        return this;
    }

    // Board methods    
    worldXYToChess(worldX, worldY) {
        return this.board.worldXYToChess(worldX, worldY);
    }

    tileXYToChess(tileX, tileY) {
        return this.board.tileXYToChess(tileX, tileY);
    }

    getNeighborChessAtAngle(chess, angle) {
        return this.board.getNeighborChessAtAngle(chess, angle);
    }

    getNeighborChessAtDirection(chess, direction) {
        return this.board.getNeighborChessAtDirection(chess, direction);
    }

}

export default Bejeweled;