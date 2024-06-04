import ComponentBase from '../../utils/componentbase/ComponentBase';

declare namespace KeysHub {
    interface IConfig {
        singleMode?: boolean
    }
}

declare class KeysHub extends ComponentBase {
    constructor(
        parent: Phaser.Scene | Phaser.Game,
        config?: KeysHub.IConfig
    );

    readonly excludeMode: boolean;

    plugKeyObject(
        keyObject: Phaser.Input.Keyboard.Key,
        keyCode?: string
    ): this;

    plugKeyObjectss(
        keys: Phaser.Input.Keyboard.Key[] | { keyCode: [keyObject: Phaser.Input.Keyboard.Key] }
    ): this;

    unplugKeyObject(
        keyObject: Phaser.Input.Keyboard.Key
    ): this;

    unplugKeyObjects(
        keys: Phaser.Input.Keyboard.Key[] | { keyCode: [keyObject: Phaser.Input.Keyboard.Key] }
    ): this;

    addKey(keyCode: string): Phaser.Input.Keyboard.Key;

    addKeys(
        keys: string
    ): {
        keyCode: [
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
        keyCode: [
            keyObject: Phaser.Input.Keyboard.Key[] | Phaser.Input.Keyboard.Key
        ]
    };

    getKeyObjects(
        keyCode: string
    ): Phaser.Input.Keyboard.Key[];

}

export default KeysHub;