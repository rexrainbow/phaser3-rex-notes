import GOManager from '../../gameobject/gomanager/GOManager';

export default LayerManager;

declare namespace LayerManager {
    interface IConfig {
        layers?: string[];

        createGameObject?: GOManager.CreateGameObjectCallbackType,
    }
}

declare class LayerManager extends GOManager {
    constructor(
        scene: Phaser.Scene,
        config?: LayerManager.IConfig
    )

    getLayer(name: string): this;

    addToLayer(
        name: string,
        gameObject: Phaser.GameObjects.GameObject
    ): this;
}