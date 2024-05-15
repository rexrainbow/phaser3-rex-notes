import GOManager from '../gomanager/GOManager';

export default LayerManager;

declare namespace LayerManager {
    type LayerGameObjectType = Phaser.GameObjects.Layer | Phaser.GameObjects.Container;

    interface IConfig {
        layers?: string[];
        rootLayer?: LayerGameObjectType;

        createGameObject?: GOManager.CreateGameObjectCallbackType,
    }
}

declare class LayerManager extends GOManager {
    constructor(
        scene: Phaser.Scene,
        config?: LayerManager.IConfig
    )
    constructor(
        scene: Phaser.Scene,
        config?: string[]
    )

    readonly useContainer: boolean;

    setRootLayer(rootLayer?: LayerManager.LayerGameObjectType): this;

    getLayer(name: string): LayerManager.LayerGameObjectType;

    getLayers(out?: Phaser.GameObjects.GameObject[]): Phaser.GameObjects.GameObject[];

    addToLayer(
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;

    removeFromLayer(
        name: string,
        gameObject: Phaser.GameObjects.GameObject,
        addToScene?: boolean
    ): this;

    clearLayer(
        name: string,
        destroyChildren?: boolean
    ): this;


    bringLayerToTop(layer: string): this;

    sendLayerToBack(layer: string): this;

    moveLayerBelow(layer: string, baseLayerName: string): this;

    moveLayerAbove(layer: string, baseLayerName: string): this;
}