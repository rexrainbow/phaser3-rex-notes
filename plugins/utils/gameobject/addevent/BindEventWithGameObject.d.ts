/**
 * Bind an event emitter event to game object destroy lifecycle.
 *
 * @param gameObject - Game object that owns the binding.
 * @param eventEmitter - Event emitter source.
 * @param eventName - Event name to listen for.
 * @param callback - Event callback.
 * @param scope - Callback scope.
 * @param once - Listen once only.
 * @returns The game object.
 */
export default function (
    gameObject: Phaser.GameObjects.GameObject,
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.GameObjects.GameObject;
