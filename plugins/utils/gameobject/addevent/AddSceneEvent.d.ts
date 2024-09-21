export default function (
    bindingTarget: Phaser.GameObjects.GameObject,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.GameObjects.GameObject;

export default function (
    bindingTarget: Phaser.Scene,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.Scene;