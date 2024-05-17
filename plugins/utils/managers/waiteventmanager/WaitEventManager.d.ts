import WaitEvent from '../../waitevent/WaitEvent';
import Managers from '../Managers';

export default WaitEventManager;

declare namespace WaitEventManager {
    interface IConfig {
        completeEventName?: string,
        clickTarget?: Phaser.Scene | Phaser.GameObjects.GameObject;
        clickShortcutKeys?: string,
        camera?: Phaser.Cameras.Scene2D.Camera
    }

    interface IWaitAnyConfig {
        time?: number,
        click?: boolean,
        key?: string | boolean,
        camera?: string,
        bgm?: boolean,
        bgm2?: boolean,
        se?: boolean,
        se2?: boolean,

        // GameObject tween
    }
}

declare class WaitEventManager extends WaitEvent {
    constructor(
        parent: Managers,
        config?: WaitEventManager.IConfig,
    );

    setClickTarget(
        target?: Phaser.GameObjects.GameObject | Phaser.Scene
    ): this;

    clearClickTarget(): this;

    setClickShortcutKeys(keys?: string): this;

    clearClickShortcutKeys(): this;

    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        completeNextTick?: boolean
    ): Managers;

    addWaitCompleteCallback(callback: Function, scope?: Object): this;
    clearWaitCompleteCallbacks(): this;

    waitTime(duration: number): Managers;
    waitClick(): Managers;
    waitKeyDown(key?: string): Managers;
    waitGameObjectTweenComplete(
        goType: string | undefined, name: string,
        property: string
    ): Managers;
    waitSoundEffectComplete(): Managers;
    waitSoundEffect2Complete(): Managers;
    waitBackgroundMusicComplete(): Managers;
    waitBackgroundMusic2Complete(): Managers;
    waitCameraEffectComplete(effectName: string, cameraName?: string): Managers;
    waitAny(config?: { [name: string]: any }): Managers;
}