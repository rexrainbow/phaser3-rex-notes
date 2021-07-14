import MainState from './states/MainState.js';
import Board from './board/Board.js';
import Input from './input/Input.js';
import WaitEvents from '../../plugins/waitevents.js';
import InputMethods from './methods/InputMethods.js';
import BoardMethods from './methods/BoardMethods.js';
import WaitEventMethods from './methods/WaitEventMethods.js';
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

        var defaultInput = GetValue(config, 'input', true);
        if (defaultInput) {
            this.input = new Input(this, config);
        } else {
            this.input = undefined;
        }

        this.waitEvents = new WaitEvents();

        this.mainState = new MainState(this, config);

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

    start() {
        this.mainState.goto('START');
        return this;
    }
}

Object.assign(
    Bejeweled.prototype,
    InputMethods,
    BoardMethods,
    WaitEventMethods,
    DataManagerMethods
);

export default Bejeweled;