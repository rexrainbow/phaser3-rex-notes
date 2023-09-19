import ContainerLite from '../../../plugins/containerlite.js';

export default ControlPoints;

declare namespace ControlPoints {
    type CreateGameObjectCallbackType = (scene: Phaser.Scene) => Phaser.GameObjects.GameObject;

    interface IBoundsRectangleConfig {
        color?: number,
        alpha?: number,
        strokeColor?: number,
        strokeWidth?: number,
    }

    interface IPointConfig {
        color?: number,
        alpha?: number,
        strokeColor?: number,
        strokeWidth?: number,
        size?: number,
        shape?: 'rectangle' | 'circle'
    }

    interface IConfig {
        boundsRectangle?: IBoundsRectangleConfig | CreateGameObjectCallbackType,

        originPoint?: IPointConfig | CreateGameObjectCallbackType,
        resizePoint?: IPointConfig | CreateGameObjectCallbackType,
        rotationPoint?: IPointConfig | CreateGameObjectCallbackType,
    }
}

declare class ControlPoints extends ContainerLite {
    constructor(
        scene: Phaser.Scene,
        config?: ControlPoints.IConfig
    )

    layout(): this;

    setBindingTarget(target?: Phaser.GameObjects.GameObject): this;

    getElement(mapNameList: string): Phaser.GameObjects.GameObject;
}