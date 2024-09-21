export default function (
    bindingTarget: Phaser.GameObjects.GameObject,
    callback: (time: number, delta: number) => void,
    scope?: unknown,
    once?: boolean,
): Phaser.GameObjects.GameObject;

export default function (
    bindingTarget: Phaser.Scene,
    callback: (time: number, delta: number) => void,
    scope?: unknown,
    once?: boolean,
): Phaser.Scene;

