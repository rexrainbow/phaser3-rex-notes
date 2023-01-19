export default FileDropZone;

declare namespace FileDropZone {

    interface IConfig {
        x?: number,
        y?: number,
        width?: number,
        height?: number,

        filters?: {
            [filterType: string]: (file: File) => boolean
        }

    }
}

declare class FileDropZone extends Phaser.GameObjects.DOMElement {
    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        width: number, height: number,
        config?: FileDropZone.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        x: number, y: number,
        config?: FileDropZone.IConfig
    );

    constructor(
        scene: Phaser.Scene,
        config?: FileDropZone.IConfig
    );

    syncTo(gameObject: Phaser.GameObjects.GameObject): this;

    readonly files: File[];

    loadFile(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string
    ): this;

    loadFilePromise(
        file: File,
        loaderType: string,
        key: string,
        cacheType?: string
    ): Promise<any>;
}