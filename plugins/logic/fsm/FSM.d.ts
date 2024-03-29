import FSMBase from './FSMBase';

export default FSM;

declare namespace FSM {

    interface IStateConfig extends FSMBase.IStateConfig {
        next?: string | ((this: FSM) => string),
        enter?: (this: FSM) => void,
        exit?: (this: FSM) => void,
        update?: (this: FSM, time: number, delta: number) => void;
        preupdate?: (this: FSM, time: number, delta: number) => void;
        postupdate?: (this: FSM, time: number, delta: number) => void;
    }

    interface IConfig extends FSMBase.IConfig {
        states?: { [name: string]: IStateConfig },

        scene?: Phaser.Scene;
    }
}

declare class FSM extends FSMBase {
    constructor(config?: FSM.IConfig);

    addState(
        name: string,
        state: FSM.IStateConfig
    ): this;
    addState(state: FSM.IStateConfig): this;

    addStates(
        states: { [name: string]: FSM.IStateConfig },
    ): this;
    addStates(
        states: FSM.IStateConfig[]
    ): this;

    update(
        time: number,
        delta: number
    ): void;

    preupdate(
        time: number,
        delta: number
    ): void;

    postupdate(
        time: number,
        delta: number
    ): void;

    startUpdate(
        scene?: Phaser.Scene
    ): this;
    stopUpdate(): this;

    startPreUpdate(
        scene?: Phaser.Scene
    ): this;
    stopPreUpdate(): this;

    startPostUpdate(
        scene?: Phaser.Scene
    ): this;
    stopPostUpdate(): this;

}