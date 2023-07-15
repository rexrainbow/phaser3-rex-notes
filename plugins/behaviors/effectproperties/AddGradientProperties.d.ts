export default AddGradientProperties;

declare namespace AddGradientProperties {
    interface GradientGameObject extends Phaser.GameObjects.GameObject {
        gradientColor: [number, number] | null | false;
        gradientColor1: number | null | false;
        gradientColor2: number | null | false;
        gradientAlpha: number;
        gradientFromX: number;
        gradientFromY: number;
        gradientToX: number;
        gradientToY: number;
        gradientSize: number;

    }
}

declare function AddGradientProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddGradientProperties.GradientGameObject;
