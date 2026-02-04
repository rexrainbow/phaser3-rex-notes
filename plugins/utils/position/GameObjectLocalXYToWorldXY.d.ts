export default GameObjectLocalXYToWorldXY;

/**
 * Convert local coordinates of a game object to world coordinates.
 *
 * @param gameObject - Target game object.
 * @param localX - Local x value.
 * @param localY - Local y value.
 * @param out - Output object or true to use an internal object.
 * @returns World coordinate object.
 */
declare function GameObjectLocalXYToWorldXY(
    gameObject: Phaser.GameObjects.GameObject,
    localX: number,
    localY: number,
    out?: { x: number, y: number } | true
): { x: number, y: number };
