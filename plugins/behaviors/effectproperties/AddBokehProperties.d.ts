export default AddBokehProperties;

declare namespace AddBokehProperties {
    interface BokehGameObject extends Phaser.GameObjects.GameObject {
        bokehRadius: number | null | false;
        bokehAmount: number;
        bokehContrast: number;
    }
}

declare function AddBokehProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddBokehProperties.BokehGameObject;
