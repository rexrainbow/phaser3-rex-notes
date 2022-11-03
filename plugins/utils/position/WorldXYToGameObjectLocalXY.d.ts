export default WorldXYToGameObjectLocalXY;

declare function WorldXYToGameObjectLocalXY(
    gameObject: Phaser.GameObjects.GameObject,
    worldX: number,
    worldY: number,
    camera?: Phaser.Cameras.Scene2D.Camera,
    out?: { x: number, y: number }
): { x: number, y: number };