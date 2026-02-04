export default GetBoundsOfGameObjects;

/**
 * Get combined bounds of multiple game objects.
 *
 * @param gameObjects - Game object list.
 * @param out - Output rectangle.
 * @returns Combined bounds rectangle.
 */
declare function GetBoundsOfGameObjects(
    gameObjects: Phaser.GameObjects.GameObject[],
    out: Phaser.Geom.Rectangle
): Phaser.Geom.Rectangle;
