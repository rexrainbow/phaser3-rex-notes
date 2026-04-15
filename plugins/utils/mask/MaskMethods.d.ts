/**
 * Apply a mask source game object to a target game object.
 *
 * The target receives either a WebGL `MaskController` or a Canvas
 * `GeometryMask`, depending on the current render mode.
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The target game object that will receive the mask.
 * @param {Phaser.GameObjects.GameObject} maskGameObject - The game object that provides the mask.
 * @param {boolean} [invert] - Set to `true` to invert the mask in WebGL mode.
 * @param {boolean} [isLocalMask] - Set to `true` to create a local WebGL mask instead of a shared mask.
 * @returns {void}
 */
declare function SetMask(
    gameObject: Phaser.GameObjects.GameObject,
    maskGameObject: Phaser.GameObjects.GameObject,
    invert?: boolean,
    isLocalMask?: boolean
): void;

/**
 * Remove the current mask from a game object.
 *
 * This only detaches the mask from the target game object. The shared mask
 * object owned by the mask source is kept alive until the source is destroyed.
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The masked game object.
 * @returns {void}
 */
declare function ClearMask(
    gameObject: Phaser.GameObjects.GameObject,
): void;

export {
    SetMask,
    ClearMask,
}
