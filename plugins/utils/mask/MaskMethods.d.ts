/**
 * WebGL mask placement mode.
 *
 * - `shared`: Share one mask controller from the mask source game object.
 * - `local`: Add a private mask to the target's internal filter list.
 * - `world`: Add a private mask to the target's external filter list.
 */
type MaskType = 'shared' | 'local' | 'world';

/**
 * Apply a mask source game object to a target game object.
 *
 * The target receives either a WebGL `MaskController` or a Canvas
 * `GeometryMask`, depending on the current render mode.
 *
 * @param {Phaser.GameObjects.GameObject} gameObject - The target game object that will receive the mask.
 * @param {Phaser.GameObjects.GameObject} maskGameObject - The game object that provides the mask.
 * @param {boolean} [invert] - Set to `true` to invert the mask in WebGL mode.
 * @param {MaskType} [maskType='shared'] - WebGL mask placement mode. Canvas mode always uses a shared `GeometryMask`.
 * @returns {void}
 */
declare function SetMask(
    gameObject: Phaser.GameObjects.GameObject,
    maskGameObject: Phaser.GameObjects.GameObject,
    invert?: boolean,
    maskType?: MaskType
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
    MaskType,
    SetMask,
    ClearMask,
}
