import EventEmitter from '../../utils/eventemitter/EventEmitter';


export default GroupNavigator;

declare namespace GroupNavigator {
    type FocusEnableCallbackType = (gameOject: Phaser.GameObjects.GameObject) => boolean;

    interface IConfig {
        enable?: boolean,

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

    readonly focusedTarget: Phaser.GameObjects.GameObject | null;
    readonly focusIndex: { x: number, y: number };

    targets: Phaser.GameObjects.GameObject[] |
        Phaser.GameObjects.GameObject[][];

    setEnable(enable?: boolean): this;
    enable: boolean;

    setTargets(
        targets?: Phaser.GameObjects.GameObject[],
        columns?: number
    ): this;

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

    addTarget(gameObject: Phaser.GameObjects.GameObject): this;
    insertTarget(
        gameObject: Phaser.GameObjects.GameObject,
        index: number
    ): this;
    removeTarget(gameObject: Phaser.GameObjects.GameObject): this;

}