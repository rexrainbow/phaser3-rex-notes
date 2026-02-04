/**
 * Bind an event emitter event to scene shutdown/destroy lifecycle.
 *
 * @param scene - Scene that owns the binding.
 * @param eventEmitter - Event emitter source.
 * @param eventName - Event name to listen for.
 * @param callback - Event callback.
 * @param scope - Callback scope.
 * @param once - Listen once only.
 * @returns The scene.
 */
export default function (
    scene: Phaser.Scene,
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.Scene;
