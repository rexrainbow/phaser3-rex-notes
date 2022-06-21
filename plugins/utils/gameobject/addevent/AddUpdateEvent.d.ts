export default function (
    gameObject: Phaser.GameObjects.GameObject,
    callback: (time: number, delta: number) => void,
    scope?: unknown
): Phaser.GameObjects.GameObject