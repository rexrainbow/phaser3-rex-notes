import ComponentBase from '../../plugins/utils/componentbase/ComponentBase';
import MainState from './states/MainState';
import Board from './board/BoardWrapper';
import Input from './input/Input';
import WaitEvents from '../../plugins/waitevents';
import InputMethods from './methods/InputMethods';
import BoardMethods from './methods/BoardMethods';
import WaitEventMethods from './methods/WaitEventMethods';
import DataManagerMethods from '../../plugins/utils/data/DataManagerMethods';
import CommandMethods from './methods/CommandMethods';
import SetMethods from './methods/SetMethods';

import { Utils as PhaserUtils } from 'phaser';
const GetValue = PhaserUtils.Objects.GetValue;

class Bejeweled extends ComponentBase {
    boardWrapper: any;
    destroyDataManager: any;
    emit: any;
    input: any;
    mainState: any;
    rexBoard: any;
    scene: any;
    waitEvents: any;

    constructor(scene?: any, config?: any) {
        super(scene, config);
        // this.scene

        this.rexBoard = scene[GetValue(config, 'rexBoard', 'rexBoard')];

        this.boardWrapper = new Board(scene, config);

        var defaultInput = GetValue(config, 'input', true);
        if (defaultInput?: any) {
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

    shutdown(fromScene?: any) {
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

    destroy(fromScene?: any) {
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
    SetMethods,
);

export default Bejeweled;