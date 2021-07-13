import MainState from './states/MainState.js';
import Board from './board/Board.js';
import Input from './input/Input.js';
import WaitEvents from '../../plugins/waitevents.js';
import DataManagerMethods from '../../plugins/utils/data/DataManagerMethods.js';

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

        var defaultInput = GetValue(config, 'input', true);
        if (defaultInput) {
            this.input = new Input(this, config);
        } else {
            this.input = undefined;
        }

        this.waitEvents = new WaitEvents();

        this.boot();
    }

    boot() {
        this.scene.events.once('shutdown', this.destroy, this);
    }

    shutdown() {
        super.shutdown();

        if (this.input) {
            this.input.destroy();
        }
        this.board.destroy();
        this.mainState.destroy();
        this.waitEvents.destroy();

        this.destroyDataManager();

        this.scene = undefined;
        this.board = undefined;
        this.mainState = undefined;
        this.input = undefined;
        this.waitEvents = undefined;
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

    get selectedChess2() {
        return this.mainState.selectedChess2;
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
        if (this.input) {
            this.input.setEnable(enable);
        }
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

    // Chess properties
    getChessMoveTo(chess) {
        return (chess) ? chess.rexMoveTo : undefined;
    }

    get chessTileZ() {
        return this.board.chessTileZ;
    }

    // Custom eliminateChess, falling action
    waitEvent(eventEmitter, eventName) {
        if (eventName === undefined) {
            eventName = 'complete';
        }
        this.waitEvents.waitEvent(eventEmitter, eventName);
        return this;
    }

    // Expose board instance
    getBoard() {
        return this.board.board;
    }

    // Expose match instance
    getMatch() {
        return this.board.match;
    }
}

Object.assign(
    Bejeweled.prototype,
    DataManagerMethods
);

export default Bejeweled;