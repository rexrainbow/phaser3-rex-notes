import ComponentBase from '../../plugins/utils/componentbase/ComponentBase.js';
import MainState from './states/MainState.js';
import Board from './board/BoardWrapper.js';
import Input from './input/Input.js';
import WaitEvents from '../../plugins/waitevents.js';
import InputMethods from './methods/InputMethods.js';
import BoardMethods from './methods/BoardMethods.js';
import WaitEventMethods from './methods/WaitEventMethods.js';
import DataManagerMethods from '../../plugins/utils/data/DataManagerMethods.js';
import CommandMethods from './methods/CommandMethods.js';

const GetValue = Phaser.Utils.Objects.GetValue;

class Bejeweled extends ComponentBase {
    constructor(scene, config) {
        super(scene, config);
        // this.scene

        this.rexBoard = scene[GetValue(config, 'rexBoard', 'rexBoard')];

        this.boardWrapper = new Board(scene, config);

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

    shutdown(fromScene) {
        super.shutdown(fromScene);

        if (this.input) {
            this.input.destroy();
        }
        this.boardWrapper.destroy();
        this.mainState.destroy();
        this.waitEvents.destroy();

        this.destroyDataManager();

        this.boardWrapper = undefined;
        this.mainState = undefined;
        this.input = undefined;
        this.waitEvents = undefined;

        return this;
    }

    destroy(fromScene) {
        this.emit('destroy');
        super.destroy(fromScene);
        return this;
    }
}

Object.assign(
    Bejeweled.prototype,
    InputMethods,
    BoardMethods,
    WaitEventMethods,
    DataManagerMethods,
    CommandMethods,
);

export default Bejeweled;