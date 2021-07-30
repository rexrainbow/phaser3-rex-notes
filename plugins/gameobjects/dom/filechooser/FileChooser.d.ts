export default FileChooser;

declare namespace FileChooser {

    interface IConfig {
        accept?: string,
        multiple?: boolean
    }

    namespace Events {
        type ValueChangeCallbackType = (fileChooser: FileChooser) => void;
    }
}

declare class FileChooser extends Phaser.GameObjects.DOMElement {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: FileChooser.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: FileChooser.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: FileChooser.IConfig
    );

    syncTo(gameObject: Phaser.GameObjects.GameObject): this;

    readonly files: File[];

    setAccept(accept: string): this;

    setMultiple(multiple?: boolean): this;

}