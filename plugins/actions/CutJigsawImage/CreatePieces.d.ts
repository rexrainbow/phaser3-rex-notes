import GenerateFrames from './generateframes/GenerateFrames';

export default CreatePieces;

declare namespace CreatePieces {
    type DrawShapeCallbackType = GenerateFrames.DrawShapeCallbackType;

    interface IConfig<T = Phaser.GameObjects.Image> {
        piecesKey?: string,
        columns: number, rows: number,
        edgeWidth?: number, edgeHeight?: number,

        drawShapeCallback?: DrawShapeCallbackType,
        edges?: GenerateFrames.EdgesType | GenerateFrames.GetEdgeCallbacksType,
        useDynamicTexture?: boolean,

        createImageCallback?: (
            scene: Phaser.Scene,
            key: Phaser.Textures.Texture,
            frame: string
        ) => T,
        ImageClass?: T,
        objectPool?: T[],

        originX?: number,
        originY?: number,

        add?: boolean,
        align?: boolean,
    }
}

declare function CreatePieces<T = Phaser.GameObjects.Image>(
    gameObject: Phaser.GameObjects.GameObject,
    config: CreatePieces.IConfig,
): T[];
