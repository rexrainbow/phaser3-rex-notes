export default function (
    bindingTarget: Phaser.GameObjects.GameObject | Phaser.Scene,
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string,
    callback: Function,
    scope?: unknown
): Phaser.GameObjects.GameObject;
