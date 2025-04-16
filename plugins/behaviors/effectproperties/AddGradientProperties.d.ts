export default AddGradientProperties;

declare namespace AddGradientProperties {
    interface Gradient {
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

    interface GradientGameObject extends Gradient, Phaser.GameObjects.GameObject {
    }

    interface GradientCamera extends Gradient, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddGradientProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddGradientProperties.GradientGameObject;

declare function AddGradientProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddGradientProperties.GradientCamera;