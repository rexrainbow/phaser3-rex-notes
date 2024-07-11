declare namespace CursorKeys {
    interface ICursorKeys {
        up: Phaser.Input.Keyboard.Key,
        down: Phaser.Input.Keyboard.Key,
        left: Phaser.Input.Keyboard.Key,
        right: Phaser.Input.Keyboard.Key,
    }
}

declare class CursorKeys {
    readonly cursorKeys: CursorKeys.ICursorKeys;
    readonly noKeyDown: boolean;
    keys: { [name: string]: Phaser.Input.Keyboard.Key };

    destroy(): void;

    createCursorKeys(): CursorKeys.ICursorKeys;

    setKeyState(keyName: string, isDown: boolean): this;

    clearAllKeysState(): this;

    getKeyState(keyName: string): Phaser.Input.Keyboard.Key;

    readonly upKeyDown: boolean;
    readonly downKeyDown: boolean;
    readonly leftKeyDown: boolean;
    readonly rightKeyDown: boolean;
    readonly anyKeyDown: boolean;

    addKey(
        keyName: string,
        keyCode?: number | string,
    ): this;

    addKeys(keyNames: string[]): this;

}

export default CursorKeys;