export default AddNegativeProperties;

declare namespace AddNegativeProperties {
    interface Negative {
        negative: null | boolean;
    }

    interface NegativeGameObject extends Negative, Phaser.GameObjects.GameObject {
    }

    interface NegativeCamera extends Negative, Phaser.Cameras.Scene2D.BaseCamera {
    }
}

declare function AddNegativeProperties(
    gameObject: Phaser.GameObjects.GameObject
): AddNegativeProperties.NegativeGameObject;

declare function AddNegativeProperties(
    camera: Phaser.Cameras.Scene2D.BaseCamera
): AddNegativeProperties.NegativeCamera;