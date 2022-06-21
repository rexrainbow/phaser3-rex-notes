export default function (
    gameObject: Phaser.GameObjects.GameObject,
    eventEmitter: Phaser.Events.EventEmitter,
    eventName: string,
    callback: Function,
    scope?: unknown
): Phaser.GameObjects.GameObject