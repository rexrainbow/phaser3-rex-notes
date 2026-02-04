/**
 * Bind an event emitter event to a game object lifecycle.
 *
 * @param bindingTarget - Game object that owns the binding.
 * @param eventEmitter - Event emitter source.
 * @param eventName - Event name to listen for.
 * @param callback - Event callback.
 * @param scope - Callback scope.
 * @param once - Listen once only.
 * @returns The binding target.
 */
export default function (
    bindingTarget: Phaser.GameObjects.GameObject,
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.GameObjects.GameObject;

/**
 * Bind an event emitter event to a scene lifecycle.
 *
 * @param bindingTarget - Scene that owns the binding.
 * @param eventEmitter - Event emitter source.
 * @param eventName - Event name to listen for.
 * @param callback - Event callback.
 * @param scope - Callback scope.
 * @param once - Listen once only.
 * @returns The binding target.
 */
export default function (
    bindingTarget: Phaser.Scene,
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.Scene;

