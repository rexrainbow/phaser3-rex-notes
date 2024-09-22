import GOManager from '../gomanager/GOManager';

export default LayerManager;

declare namespace LayerManager {
    interface ILayerConfig {
        name?: string,
        scrollFactor?: number, scrollFactorX?: number, scrollFactorY?: number,
        cameraName?: string
    }

    type LayerConfigType = string | ILayerConfig;

    interface IConfig {
        layers?: LayerConfigType[];
        rootLayer?: Phaser.GameObjects.Layer;

        createGameObject?: GOManager.CreateGameObjectCallbackType,
    }

    interface IBobBase extends GOManager.IBobBase {
        camera?: Phaser.Cameras.Scene2D.Camera
    }

    type LayerNameType = string | Phaser.GameObjects.GameObject

}

declare class LayerManager extends GOManager {
    constructor(
        scene: Phaser.Scene,
        config?: LayerManager.IConfig,
    )
    constructor(
        scene: Phaser.Scene,
        config?: LayerManager.LayerConfigType,
    )

    setRootLayer(rootLayer?: Phaser.GameObjects.Layer): this;

    get(
        layer: string | Phaser.GameObjects.GameObject,
        out?: LayerManager.IBobBase[]
    ): LayerManager.IBobBase | LayerManager.IBobBase[];

    getLayer(
        layer: string | Phaser.GameObjects.GameObject
    ): Phaser.GameObjects.Layer;

    getLayers(
        out?: Phaser.GameObjects.GameObject[]
    ): Phaser.GameObjects.Layer[];

    addToLayer(
        layer: string | Phaser.GameObjects.GameObject,
        gameObjects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    addToBottomLayer(
        gameObjects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    addToTopLayer(
        gameObjects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[]
    ): this;

    removeFromLayer(
        layer: string | Phaser.GameObjects.GameObject,
        gameObject: Phaser.GameObjects.GameObject,
        addToScene?: boolean
    ): this;

    clearLayer(
        layer: string | Phaser.GameObjects.GameObject,
        destroyChildren?: boolean
    ): this;


    bringLayerToTop(
        layer: string | Phaser.GameObjects.GameObject
    ): this;

    sendLayerToBack(
        layer: string | Phaser.GameObjects.GameObject
    ): this;

    moveLayerBelow(
        layer: string | Phaser.GameObjects.GameObject,
        baseLayerName: string | Phaser.GameObjects.GameObject
    ): this;

    moveLayerAbove(
        layer: string | Phaser.GameObjects.GameObject,
        baseLayerName: string | Phaser.GameObjects.GameObject
    ): this;

    setCamera(
        layer: string | Phaser.GameObjects.GameObject,
        cameraName?: string | number | Phaser.Cameras.Scene2D.Camera
    ): this;

    getCamera(
        layer: string | Phaser.GameObjects.GameObject
    ): Phaser.Cameras.Scene2D.Camera | null;

    setScrollFactor(
        layer: string | Phaser.GameObjects.GameObject,
        scrollFactorX: number, scrollFactorY?: number
    ): this;

}