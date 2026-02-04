export default WorldXYToGameObjectLocalXY;

/**
 * Convert world coordinates to local coordinates of a game object.
 *
 * @param gameObject - Target game object.
 * @param worldX - World x value.
 * @param worldY - World y value.
 * @param camera - Camera used for conversion.
 * @param out - Output object or true to use an internal object.
 * @returns Local coordinate object.
 */
declare function WorldXYToGameObjectLocalXY(
    gameObject: Phaser.GameObjects.GameObject,
    worldX: number,
    worldY: number,
    camera?: Phaser.Cameras.Scene2D.Camera,
    out?: { x: number, y: number } | true
): { x: number, y: number };
