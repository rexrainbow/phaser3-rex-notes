/**
 * Bind a scene event to a game object lifecycle.
 *
 * @param bindingTarget - Game object that owns the binding.
 * @param eventName - Scene event name.
 * @param callback - Event callback.
 * @param scope - Callback scope.
 * @param once - Listen once only.
 * @returns The binding target.
 */
export default function (
    bindingTarget: Phaser.GameObjects.GameObject,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.GameObjects.GameObject;

/**
 * Bind a scene event to a scene lifecycle.
 *
 * @param bindingTarget - Scene that owns the binding.
 * @param eventName - Scene event name.
 * @param callback - Event callback.
 * @param scope - Callback scope.
 * @param once - Listen once only.
 * @returns The binding target.
 */
export default function (
    bindingTarget: Phaser.Scene,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.Scene;
