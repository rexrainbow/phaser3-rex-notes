export default function (
    bindingTarget: Phaser.GameObjects.GameObject,
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.GameObjects.GameObject;

export default function (
    bindingTarget: Phaser.Scene,
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string,
    callback: Function,
    scope?: unknown,
    once?: boolean,
): Phaser.Scene;

