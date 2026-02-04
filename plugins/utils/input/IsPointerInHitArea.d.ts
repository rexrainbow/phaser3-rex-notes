export default IsPointerInHitArea;

/**
 * Utilities for hit-area pointer checks.
 */
declare namespace IsPointerInHitArea {
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
 * Check if a pointer is in a game object's hit area.
 *
 * @param gameObject - Target game object.
 * @param pointer - Pointer instance.
 * @param preTest - Callback before hit test.
 * @param postTest - Callback after hit test.
 * @param returnFirstPointer - Return first matching pointer.
 * @returns True, or first pointer when requested.
 */
declare function IsPointerInHitArea(
    gameObject: Phaser.GameObjects.GameObject,
    pointer?: Phaser.Input.Pointer,
    preTest?: IsPointerInHitArea.TestCallbackType,
    postTest?: IsPointerInHitArea.TestCallbackType,
    returnFirstPointer?: boolean
): boolean | Phaser.Input.Pointer;

