import WaitEvent from '../../waitevent/WaitEvent';
import Managers from '../Managers';

export default WaitEventManager;

declare namespace WaitEventManager {
    interface IConfig {
        /**
         * Complete event name.
         */
        completeEventName?: string,
        /**
         * Click target.
         */
        clickTarget?: Phaser.Scene | Phaser.GameObjects.GameObject;
        /**
         * Click shortcut keys.
         */
        clickShortcutKeys?: string,
        /**
         * Camera target.
         */
        camera?: Phaser.Cameras.Scene2D.Camera
    }

    interface IWaitAnyConfig {
        /**
         * Wait time in ms.
         */
        time?: number,
        /**
         * Wait for click.
         */
        click?: boolean,
        /**
         * Wait for key.
         */
        key?: string | boolean,
        /**
         * Wait for camera effect.
         */
        camera?: string,
        /**
         * Wait for bgm complete.
         */
        bgm?: boolean,
        /**
         * Wait for bgm2 complete.
         */
        bgm2?: boolean,
        /**
         * Wait for sound effect complete.
         */
        se?: boolean,
        /**
         * Wait for sound effect2 complete.
         */
        se2?: boolean,

        // GameObject tween
    }
}

/**
 * Wait event manager for input, time, and audio/camera events.
 */
declare class WaitEventManager extends WaitEvent {
    /**
     * Create a wait event manager.
     * @param parent - Managers instance.
     * @param config - Configuration options.
     */
    constructor(
        parent: Managers,
        config?: WaitEventManager.IConfig,
    );

    /**
     * Set click target.
     * @param target - Click target.
     * @returns This instance.
     */
    setClickTarget(
        target?: Phaser.GameObjects.GameObject | Phaser.Scene
    ): this;

    /**
     * Clear click target.
     * @returns This instance.
     */
    clearClickTarget(): this;

    /**
     * Set click shortcut keys.
     * @param keys - Shortcut keys.
     * @returns This instance.
     */
    setClickShortcutKeys(keys?: string): this;

    /**
     * Clear click shortcut keys.
     * @returns This instance.
     */
    clearClickShortcutKeys(): this;

    /**
     * Wait for an event.
     * @param eventEmitter - Event emitter.
     * @param eventName - Event name.
     * @param completeNextTick - True to complete on next tick.
     * @returns Managers instance.
     */
    waitEvent(
        eventEmitter: Phaser.Events.EventEmitter,
        eventName: string,
        completeNextTick?: boolean
    ): Managers;

    /**
     * Add wait complete callback.
     * @param callback - Callback function.
     * @param scope - Callback scope.
     * @returns This instance.
     */
    addWaitCompleteCallback(callback: Function, scope?: Object): this;
    /**
     * Clear wait complete callbacks.
     * @returns This instance.
     */
    clearWaitCompleteCallbacks(): this;

    /**
     * Wait for a duration.
     * @param duration - Duration in ms.
     * @returns Managers instance.
     */
    waitTime(duration: number): Managers;
    /**
     * Wait for click.
     * @returns Managers instance.
     */
    waitClick(): Managers;
    /**
     * Wait for key down.
     * @param key - Key name.
     * @returns Managers instance.
     */
    waitKeyDown(key?: string): Managers;
    /**
     * Wait for tween completion.
     * @param goType - Game object type.
     * @param name - Game object name.
     * @param property - Property name.
     * @returns Managers instance.
     */
    waitGameObjectTweenComplete(
        goType: string | undefined, name: string,
        property: string
    ): Managers;
    /**
     * Wait for sound effect complete.
     * @returns Managers instance.
     */
    waitSoundEffectComplete(): Managers;
    /**
     * Wait for sound effect2 complete.
     * @returns Managers instance.
     */
    waitSoundEffect2Complete(): Managers;
    /**
     * Wait for background music complete.
     * @returns Managers instance.
     */
    waitBackgroundMusicComplete(): Managers;
    /**
     * Wait for background music2 complete.
     * @returns Managers instance.
     */
    waitBackgroundMusic2Complete(): Managers;
    /**
     * Wait for camera effect complete.
     * @param effectName - Effect name.
     * @param cameraName - Camera name.
     * @returns Managers instance.
     */
    waitCameraEffectComplete(effectName: string, cameraName?: string): Managers;
    /**
     * Wait for any configured condition.
     * @param config - Wait config.
     * @returns Managers instance.
     */
    waitAny(config?: { [name: string]: any }): Managers;
}
