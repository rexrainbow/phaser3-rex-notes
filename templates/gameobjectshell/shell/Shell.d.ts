import LayerManager from '../layermanager/LayerManager';
import FullWindowRectangle from '../fullwindowrectangle/FullWindowRectangle';
import PropertiesPanel from '../gameobjectpanel/GameObjectPanel';
import ControlPoints from '../controlpoints/ControlPoints';

export default Shell;

declare namespace Shell {
    type LayerDepthType = 0 | 1 | 'top' | -1 | 'bottom';

    interface IConfig {
        onSelectGameObject?: (
            shell: Shell,
            gameObject: Phaser.GameObjects.GameObject
        ) => void;

        onUnSelectGameObject?: (
            shell: Shell
        ) => void;


        // LayerManager
        layers?: [string, string, string],
        layerManager?: LayerManager,


        // PropertiesPanel
        panel?: PropertiesPanel.IConfig,
        extraProperties?: PropertiesPanel.IPropertyConfig[],

        // ControlPoints
        controlPoints?: ControlPoints.IConfig,
    }
}

declare class Shell extends Phaser.Events.EventEmitter {
    constructor(
        scene: Phaser.Scene,
        config?: Shell.IConfig
    )

    readonly background: FullWindowRectangle;
    readonly panel: PropertiesPanel;
    readonly controlPoints: ControlPoints;
    readonly layerManager: LayerManager;

    readonly backgroundLayerName: string;
    readonly monitorLayerName: string;
    readonly uiLayerName: string;


    setBindingTarget(target?: Phaser.GameObjects.GameObject): this;

    clearBindingTarget(): this;

    addToUILayer(
        gameObjects: Phaser.GameObjects.GameObject,
        depth?: Shell.LayerDepthType,
    ): this;

    addToMonitorLayer(
        gameObjects: Phaser.GameObjects.GameObject | Phaser.GameObjects.GameObject[],
        depth?: Shell.LayerDepthType,
    ): this;

    addToBackgroundLayer(
        gameObjects: Phaser.GameObjects.GameObject,
        depth?: Shell.LayerDepthType,
    ): this;

    removeFromMonitorLayer(
        gameObject: Phaser.GameObjects.GameObject,
        addToScene?: boolean,
    ): this;

    clearMonitorLayer(depth?: Shell.LayerDepthType): this;

    getMonitorLayer(depth?: Shell.LayerDepthType): Phaser.GameObjects.Layer;

    getMonitorGameObjects(depth?: Shell.LayerDepthType): Phaser.GameObjects.GameObject[];

}

