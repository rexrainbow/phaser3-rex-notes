export default AddCircleProperties;

declare namespace AddCircleProperties {
    interface CircleGameObject extends Phaser.GameObjects.GameObject {
        circleColor: number | null | false;
        circleThickness: number;
        circleBackgroundColor: number;
        circleBackgroundAlpha: number;
        circleScale: number;
        circleFeather: number;

    }
}

declare function AddCircleProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddCircleProperties.CircleGameObject;
