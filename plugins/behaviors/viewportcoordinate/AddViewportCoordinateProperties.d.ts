export default AddViewportCoordinateProperties;

declare namespace AddViewportCoordinateProperties {
    interface PolarCoordinateGameObject extends Phaser.GameObjects.GameObject {
        vp: Phaser.Geom.Rectangle;
        vpx: number;
        vpy: number;
    }

    type TransformCallbackType = (
        gameObject: Phaser.GameObjects.GameObject,
        viewport: Phaser.Geom.Rectangle,
        vpx: number,
        vpy: number,
    ) => void;
}

declare function AddViewportCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    viewport?: Phaser.Geom.Rectangle,
    vpx?: number,
    vpy?: number,
    transformCallback?: AddViewportCoordinateProperties.TransformCallbackType
): AddViewportCoordinateProperties.PolarCoordinateGameObject;