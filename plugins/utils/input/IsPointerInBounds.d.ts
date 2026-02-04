// import * as Phaser from 'phaser';
export default IsPointerInBounds;

/**
 * Utilities for bounds pointer checks.
 */
declare namespace IsPointerInBounds {
    /**
     * Pre/post test callback.
     *
     * @param gameObject - Target game object.
     * @param x - Pointer x.
     * @param y - Pointer y.
     * @returns True if test passes.
     */
    type TestCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        x: number,
        y: number
    )
        => boolean;
}

/**
 * Check if a pointer is in game object bounds.
 *
 * @param gameObject - Target game object.
 * @param pointer - Pointer instance.
 * @param preTest - Callback before bounds test.
 * @param postTest - Callback after bounds test.
 * @returns True if pointer is in bounds.
 */
declare function IsPointerInBounds(
    gameObject: Phaser.GameObjects.GameObject,
    pointer?: Phaser.Input.Pointer,
    preTest?: IsPointerInBounds.TestCallbackType,
    postTest?: IsPointerInBounds.TestCallbackType
): boolean;
