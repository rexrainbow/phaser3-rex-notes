export default function (
    target: Phaser.GameObjects.GameObject | Phaser.Scene,
    gameObject: Phaser.GameObjects.GameObject,
    callback: (time: number, delta: number) => void,
    scope?: unknown
): Phaser.GameObjects.GameObject;
