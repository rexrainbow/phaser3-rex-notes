export default function GetInBoundsPointer(
    gameObject: Phaser.GameObjects.GameObject,
    isPointerDown?: boolean,
    preTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
    postTest?: (gameObject: Phaser.GameObjects.GameObject, x: number, y: number) => boolean,
): boolean;