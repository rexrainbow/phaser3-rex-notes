export default AddCircleProperties;

declare namespace AddCircleProperties {
    interface Circle {
        circleColor: number | null | false;
        circleThickness: number;
        circleBackgroundColor: number;
        circleBackgroundAlpha: number;
        circleScale: number;
        circleFeather: number;
    }

    interface CircleGameObject extends Circle, Phaser.GameObjects.GameObject {
    }

    interface CircleCamera extends Circle, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddCircleProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddCircleProperties.CircleGameObject;

declare function AddCircleProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddCircleProperties.CircleCamera;