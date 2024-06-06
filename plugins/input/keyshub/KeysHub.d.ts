import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace KeysHub {
    interface IConfig {
        singleMode?: boolean
    }
}

declare class KeysHub extends ComponentBase {
    constructor(
        parent: Phaser.Scene,
        config?: KeysHub.IConfig
    );

    readonly excludeMode: boolean;

    plugKeyObject(
        keyObject: Phaser.Input.Keyboard.Key,
        key?: string
    ): this;

    plugKeyObjects(
        keys: Phaser.Input.Keyboard.Key[] | { key: [keyObject: Phaser.Input.Keyboard.Key] }
    ): this;

    unplugKeyObject(
        keyObject: Phaser.Input.Keyboard.Key
    ): this;

    unplugKeyObjects(
        keys: Phaser.Input.Keyboard.Key[] | { key: [keyObject: Phaser.Input.Keyboard.Key] }
    ): this;

    addKey(key: string): Phaser.Input.Keyboard.Key;

    addKeys(
        keys: string
    ): {
        key: [
            keyObject: Phaser.Input.Keyboard.Key
        ]
    };

    createCursorKeys(): {
        up: Phaser.Input.Keyboard.Key,
        down: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key,
    };

    getKeyObjects(
    ): {
        key: [
            keyObject: Phaser.Input.Keyboard.Key[] | Phaser.Input.Keyboard.Key
        ]
    };

    getKeyObjects(
        key: string
    ): Phaser.Input.Keyboard.Key[];

    defineKeyStart(
        key: string
    ): this;

    defineKeyStop(
        keyObject?: Phaser.Input.Keyboard.Key
    ): this;

    defineKeyCancel(): this;

    listenFromKeyboard(): this;

}

export default KeysHub;