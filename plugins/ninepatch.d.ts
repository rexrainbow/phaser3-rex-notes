import * as Phaser from 'phaser';

export interface IConfig {
    x?: number, y?: number,
    width?: number, height?: number,

    key?: string, baseFrame?: string,
    getFrameNameCallback?: (colIndex: number, rowIndex: number, baseFrame: string) => (string | undefined),

    columns?: (number | undefined)[],
    rows?: (number | undefined)[],

    preserveRatio?: boolean,
    stretchMode?: 0 | 1 | 'scale' | 'repeat' |
    {
        edge?: 0 | 1 | 'scale' | 'repeat',
        internal?: 0 | 1 | 'scale' | 'repeat',
    },
}

export default class NinePatch extends Phaser.GameObjects.RenderTexture {
    constructor(
        scene: Phaser.Scene,
        config?: IConfig
    )

    resize(width: number, height: number): this;

    setTexture(
        key: string,
        baseFrame: string | undefined,
        columns: (number | undefined)[],
        rows: (number | undefined)[]
    ): this;

    setStretchMode(
        mode: 0 | 1 | 'scale' | 'repeat' |
        {
            edge?: 0 | 1 | 'scale' | 'repeat',
            internal?: 0 | 1 | 'scale' | 'repeat',
        }
    ): this;

    setGetFrameNameCallback(
        callback: (colIndex: number, rowIndex: number, baseFrame: string) => (string | undefined)
    ): this;

    get minWidth(): number;

    get minHeight(): number;

    get fixedPartScaleX(): number;

    get fixedPartScaleY(): number;
}