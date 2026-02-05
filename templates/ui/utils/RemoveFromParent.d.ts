export default RemoveFromParent;

/**
 * Remove a game object from its parent container or sizer.
 *
 * @param gameObject - The child game object to remove.
 * @param destroyChild - Set to true to destroy the child after removal.
 * @returns Nothing.
 */
declare function RemoveFromParent(
    gameObject: Phaser.GameObjects.GameObject,
    destroyChild?: boolean
): void;
