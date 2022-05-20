export default AddViewportCoordinateProperties;

declare namespace AddViewportCoordinateProperties {
    interface PolarCoordinateGameObject extends Phaser.GameObjects.GameObject {
        vp: Phaser.Geom.Rectangle;
        vpx: number;
        vpy: number;       
    }
}

declare function AddViewportCoordinateProperties(
    gameObject: Phaser.GameObjects.GameObject,
    viewport?: Phaser.Geom.Rectangle,
    vpx?: number, vpy?: number,    
): AddViewportCoordinateProperties.PolarCoordinateGameObject;