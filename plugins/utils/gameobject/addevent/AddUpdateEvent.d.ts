/**
 * Bind a scene update event to a game object lifecycle.
 *
 * @param bindingTarget - Game object that owns the binding.
 * @param callback - Update callback.
 * @param scope - Callback scope.
 * @param once - Listen once only.
 * @returns The binding target.
 */
export default function (
    bindingTarget: Phaser.GameObjects.GameObject,
    callback: (time: number, delta: number) => void,
    scope?: unknown,
    once?: boolean,
): Phaser.GameObjects.GameObject;

/**
 * Bind a scene update event to a scene lifecycle.
 *
 * @param bindingTarget - Scene that owns the binding.
 * @param callback - Update callback.
 * @param scope - Callback scope.
 * @param once - Listen once only.
 * @returns The binding target.
 */
export default function (
    bindingTarget: Phaser.Scene,
    callback: (time: number, delta: number) => void,
    scope?: unknown,
    once?: boolean,
): Phaser.Scene;

