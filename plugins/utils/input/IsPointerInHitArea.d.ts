declare function IsPointerInHitArea(
    gameObject: Phaser.GameObjects.GameObject,
    pointer?: Phaser.Input.Pointer,
    preTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
    postTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
    returnFirstPointer?: boolean,
): boolean | Phaser.Input.Pointer;

export default IsPointerInHitArea;