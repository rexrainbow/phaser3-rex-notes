import EventEmitter from '../../utils/eventemitter/EventEmitter';


export default GroupNavigator;

declare namespace GroupNavigator {
    type FocusEnableCallbackType = (gameOject: Phaser.GameObjects.GameObject) => boolean;

    interface IConfig {
        targets?: Phaser.GameObjects.GameObject[],
        columns?: number,

        getFocusEnableCallback?: FocusEnableCallbackType,
        focusEnableDataKey?: string,
        focusEnableKey?: string,

        eventEmitter?: EventEmitter | false,
    }
}

declare class GroupNavigator extends EventEmitter {
    constructor(scene?: any, config?: GroupNavigator.IConfig);
    constructor(config: GroupNavigator.IConfig);

    focusedTarget: Phaser.GameObjects.GameObject | null;
    focusIndex: { x: number, y: number };

    setTargets(
        targets?: Phaser.GameObjects.GameObject[],
        columns?: number
    ): this;
    targets: Phaser.GameObjects.GameObject[] |
        Phaser.GameObjects.GameObject[][];

    setFocusEnableDataKey(dataKey?: string): this;

    setFocusEnableKey(key?: string): this;

    setGetFocusEnableCallback(
        callback?: GroupNavigator.FocusEnableCallbackType
    ): this;

    getFocusedTarget(): Phaser.GameObjects.GameObject | null;

    first(): this;
    last(): this;
    next(): this;
    previous(): this;
    nextRow(): this;
    previousRow(): this;

    focus(gameObject?: Phaser.GameObjects.GameObject): this;
    blur(): this;
}