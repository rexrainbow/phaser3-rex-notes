export default GetInBoundsPointer;

/**
 * Utilities for finding pointers in bounds.
 */
declare namespace GetInBoundsPointer {
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
 * Get whether a pointer is inside game object bounds.
 *
 * @param gameObject - Target game object.
 * @param isPointerDown - Require pointer down state.
 * @param preTest - Callback before bounds test.
 * @param postTest - Callback after bounds test.
 * @returns True if a pointer is in bounds.
 */
declare function GetInBoundsPointer(
    gameObject: Phaser.GameObjects.GameObject,
    isPointerDown?: boolean,
    preTest?: GetInBoundsPointer.TestCallbackType,
    postTest?: GetInBoundsPointer.TestCallbackType
): boolean;
